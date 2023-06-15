package pwr.web.cinema_booking_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import pwr.web.cinema_booking_api.dto.CinemaHallDTO;
import pwr.web.cinema_booking_api.dto.MovieScreeningDTO;
import pwr.web.cinema_booking_api.dto.ReservationDTO;
import pwr.web.cinema_booking_api.entity.Reservation;
import pwr.web.cinema_booking_api.entity.User;
import pwr.web.cinema_booking_api.exception.BadReservationsException;
import pwr.web.cinema_booking_api.exception.NoSuchUserException;
import pwr.web.cinema_booking_api.exception.RecordNotFoundException;
import pwr.web.cinema_booking_api.exception.UnauthorizedDeletionException;
import pwr.web.cinema_booking_api.repository.ReservationRepository;
import pwr.web.cinema_booking_api.utils.PDFConverter;

import java.io.*;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final MovieScreeningService movieScreeningService;
    private final UserService userService;
    private final TemplateEngine templateEngine;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository, MovieScreeningService movieScreeningService, UserService userService, TemplateEngine templateEngine) {
        this.reservationRepository = reservationRepository;
        this.movieScreeningService = movieScreeningService;
        this.userService = userService;
        this.templateEngine = templateEngine;
    }

    private Reservation findReservationById(long id) throws RecordNotFoundException {
        return reservationRepository.findById(id).orElseThrow(RecordNotFoundException::new);
    }

    private boolean anyMovieScreeningNull(List<ReservationDTO> reservationDTOs) {
        return reservationDTOs.stream().anyMatch(r -> r.getMovieScreening() == null);
    }

    private boolean incompatibleMovieScreenings(List<ReservationDTO> reservationDTOs) {
        return reservationDTOs.stream().map(r -> r.getMovieScreening().getId()).distinct().count() != 1;
    }

    private long extractMovieScreeningId(List<ReservationDTO> reservationDTOs) throws BadReservationsException {
        if (reservationDTOs.stream().findFirst().isEmpty()) {
            throw new BadReservationsException();
        }

        MovieScreeningDTO movieScreening = reservationDTOs.stream().findFirst().get().getMovieScreening();

        if (movieScreening == null || movieScreening.getId() == null) {
            throw new BadReservationsException();
        }

        return movieScreening.getId();
    }

    private CinemaHallDTO extractCinemaHall(long movieScreeningId) throws RecordNotFoundException {
        return movieScreeningService.getMovieScreeningById(movieScreeningId).getCinemaHall();
    }

    private boolean anySeatOutsideRange(List<ReservationDTO> reservationDTOs, long movieScreeningId) throws RecordNotFoundException {
        CinemaHallDTO cinemaHall = extractCinemaHall(movieScreeningId);

        return reservationDTOs.stream().anyMatch(r -> r.getSeatRow() < 1 || r.getSeatRow() > cinemaHall.getRows() || r.getSeatColumn() < 1 || r.getSeatColumn() > cinemaHall.getColumns());
    }

    private boolean anySeatTaken(List<ReservationDTO> reservationDTOs, List<Reservation> takenSeats) {
        return reservationDTOs.stream().anyMatch(reservation -> takenSeats.stream().anyMatch(taken -> Objects.equals(taken.getSeatRow(), reservation.getSeatRow()) && Objects.equals(taken.getSeatColumn(), reservation.getSeatColumn())));
    }

    private User createUser(long id) {
        User user = new User();
        user.setId(id);
        return user;
    }

    public List<ReservationDTO> createReservations(List<ReservationDTO> reservationDTOs) throws BadReservationsException, RecordNotFoundException, NoSuchUserException {
        if (anyMovieScreeningNull(reservationDTOs) || incompatibleMovieScreenings(reservationDTOs)) {
            throw new BadReservationsException();
        }

        long movieScreeningId = extractMovieScreeningId(reservationDTOs);

        if (anySeatOutsideRange(reservationDTOs, movieScreeningId)) {
            throw new BadReservationsException();
        }

        List<Reservation> takenSeats = findReservationEntitiesByMovieScreeningId(movieScreeningId);

        if (anySeatTaken(reservationDTOs, takenSeats)) {
            throw new BadReservationsException();
        }

        long userId = userService.getId();
        User reservationUser = createUser(userId);

        List<Reservation> toSave = reservationDTOs.stream().map(ReservationDTO::toEntity).collect(Collectors.toList());

        toSave.forEach(r -> r.setUser(reservationUser));

        return reservationRepository.saveAll(toSave).stream().map(Reservation::toDto).collect(Collectors.toList());
    }

    public List<ReservationDTO> getReservations() throws NoSuchUserException {
        return reservationRepository.findAllByUserId(userService.getId()).stream().map(Reservation::toDto).collect(Collectors.toList());
    }

    public void deleteReservation(long id) throws NoSuchUserException, UnauthorizedDeletionException, RecordNotFoundException {
        Reservation toDelete = findReservationById(id);
        if (toDelete != null && toDelete.getUser() != null && userService.getId() == toDelete.getUser().getId()) {
            reservationRepository.deleteById(id);
        } else {
            throw new UnauthorizedDeletionException();
        }
    }

    private List<Reservation> findReservationEntitiesByMovieScreeningId(long id) {
        return reservationRepository
                .findAllByMovieScreeningId(id);
    }

    public List<ReservationDTO> findReservationsByMovieScreeningId(long id) {
        return findReservationEntitiesByMovieScreeningId(id)
                .stream()
                .map(Reservation::toDto)
                .collect(Collectors.toList());
    }

    public List<ReservationDTO> getAllReservations() {
        return reservationRepository.findAll()
                .stream()
                .map(Reservation::toDto)
                .collect(Collectors.toList());
    }

    private String generateHTML(Reservation reservation) {
        Context context = new Context();
        context.setVariable("reservationId", reservation.getId());
        context.setVariable("seatRow", reservation.getSeatRow());
        context.setVariable("seatColumn", reservation.getSeatColumn());
        context.setVariable("fullName", reservation.getUser().getFullName());
        context.setVariable("movieTitle", reservation.getMovieScreening().getMovie().getTitle());
        context.setVariable("screeningDate", reservation.getMovieScreening().getScreeningDate());

        return templateEngine.process("reservation", context);
    }

    private OutputStream getReservationPDF(Reservation reservation) throws IOException {
        String html = generateHTML(reservation);
        return PDFConverter.convertHtmlToPdf(html, reservation.getId());
    }

    public InputStreamResource getReservationsPDF(List<ReservationDTO> reservationDTOs) throws RecordNotFoundException, IOException {
        List<Long> ids = reservationDTOs.stream()
                .map(ReservationDTO::getId)
                .toList();

        if (ids.stream().anyMatch(id -> id == null || id < 0)) {
            throw new RecordNotFoundException();
        }

        List<OutputStream> pdfs = reservationRepository
                .findAllById(ids).stream()
                .filter(reservation -> {
                    try {
                        return reservation.getUser().getId().equals(userService.getId());
                    } catch (NoSuchUserException e) {
                        throw new RuntimeException(e);
                    }
                })
                .map(reservation -> {
                    try {
                        return getReservationPDF(reservation);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                })
                .toList();

        try (OutputStream outputStream = PDFConverter.mergePdfDocuments(pdfs)) {
            ByteArrayOutputStream byteArrayOutputStream = (ByteArrayOutputStream) outputStream;
            byte[] bytes = byteArrayOutputStream.toByteArray();
            InputStream inputStream = new ByteArrayInputStream(bytes);
            return new InputStreamResource(inputStream);

        } catch (Exception e) {
            throw new IOException();
        }
    }

    public void deleteReservationAdmin(long id) {
        reservationRepository.deleteById(id);
    }
}
