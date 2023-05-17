package pwr.web.cinema_booking_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pwr.web.cinema_booking_api.dto.CinemaHallDTO;
import pwr.web.cinema_booking_api.dto.MovieScreeningDTO;
import pwr.web.cinema_booking_api.dto.ReservationDTO;
import pwr.web.cinema_booking_api.entity.CinemaHall;
import pwr.web.cinema_booking_api.entity.Reservation;
import pwr.web.cinema_booking_api.exception.BadReservationsException;
import pwr.web.cinema_booking_api.exception.RecordNotFoundException;
import pwr.web.cinema_booking_api.repository.ReservationRepository;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final MovieScreeningService movieScreeningService;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository, MovieScreeningService movieScreeningService) {
        this.reservationRepository = reservationRepository;
        this.movieScreeningService = movieScreeningService;
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

    public List<ReservationDTO> createReservations(List<ReservationDTO> reservationDTOs) throws BadReservationsException, RecordNotFoundException {
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

        List<Reservation> toSave = reservationDTOs.stream()
                .map(ReservationDTO::toEntity)
                .collect(Collectors.toList());

        return reservationRepository.saveAll(toSave).stream()
                .map(Reservation::toDto)
                .collect(Collectors.toList());

    }
}
