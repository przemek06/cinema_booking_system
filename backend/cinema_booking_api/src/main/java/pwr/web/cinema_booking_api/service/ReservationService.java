package pwr.web.cinema_booking_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pwr.web.cinema_booking_api.dto.CinemaHallDTO;
import pwr.web.cinema_booking_api.dto.MovieDTO;
import pwr.web.cinema_booking_api.dto.MovieScreeningDTO;
import pwr.web.cinema_booking_api.dto.ReservationDTO;
import pwr.web.cinema_booking_api.entity.Movie;
import pwr.web.cinema_booking_api.entity.Reservation;
import pwr.web.cinema_booking_api.entity.User;
import pwr.web.cinema_booking_api.exception.BadReservationsException;
import pwr.web.cinema_booking_api.exception.NoSuchUserException;
import pwr.web.cinema_booking_api.exception.RecordNotFoundException;
import pwr.web.cinema_booking_api.exception.UnauthorizedDeletionException;
import pwr.web.cinema_booking_api.repository.ReservationRepository;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final MovieScreeningService movieScreeningService;
    private final UserService userService;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository, MovieScreeningService movieScreeningService, UserService userService) {
        this.reservationRepository = reservationRepository;
        this.movieScreeningService = movieScreeningService;
        this.userService = userService;
    }

    private boolean anyMovieScreeningNull(List<ReservationDTO> reservationDTOs) {
        return reservationDTOs.stream().anyMatch(r -> r.getMovieScreening() == null);
    }

    private boolean incompatibleMovieScreenings(List<ReservationDTO> reservationDTOs) {
        return reservationDTOs.stream().map(r -> r.getMovieScreening().getId()).count() != 1;
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

        return reservationDTOs.stream()
                .anyMatch(r -> r.getSeatRow() < 0
                || r.getSeatRow() > cinemaHall.getRows() - 1
                || r.getSeatColumn() < 0
                || r.getSeatColumn() > cinemaHall.getColumns() - 1);
    }

    private boolean anySeatTaken(List<ReservationDTO> reservationDTOs, List<Reservation> takenSeats) {
        return reservationDTOs.stream()
                .anyMatch(reservation -> takenSeats
                        .stream()
                        .anyMatch(taken ->
                                Objects.equals(taken.getSeatRow(), reservation.getSeatRow())
                                && Objects.equals(taken.getSeatColumn(), reservation.getSeatColumn())
                        )
                );
    }

    private User createUser(long id) throws NoSuchUserException {
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

        List<Reservation> takenSeats = reservationRepository.findAllByMovieScreeningId(movieScreeningId);

        if (anySeatTaken(reservationDTOs, takenSeats)) {
            throw new BadReservationsException();
        }

        long userId = userService.getId();
        User reservationUser = createUser(userId);

        List<Reservation> toSave = reservationDTOs.stream()
                .map(ReservationDTO::toEntity)
                .collect(Collectors.toList());

        toSave.forEach(r -> r.setUser(reservationUser));

        return reservationRepository.saveAll(toSave).stream()
                .map(Reservation::toDto)
                .collect(Collectors.toList());
    }

    public List<ReservationDTO> getReservations() throws NoSuchUserException {
        return reservationRepository.findAllByUserId(userService.getId()).stream()
                .map(Reservation::toDto)
                .collect(Collectors.toList());
    }

    public void deleteReservation(long id) throws NoSuchUserException, UnauthorizedDeletionException {
        if (userService.getId() == reservationRepository.findById(id).get().getUser().getId()) {
            reservationRepository.deleteById(id);
        } else {
            throw new UnauthorizedDeletionException();
        }
    }
}
