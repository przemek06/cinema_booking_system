package pwr.web.cinema_booking_api.controller;

import org.springframework.web.bind.annotation.*;
import pwr.web.cinema_booking_api.dto.ReservationDTO;
import pwr.web.cinema_booking_api.exception.BadReservationsException;
import pwr.web.cinema_booking_api.exception.NoSuchUserException;
import pwr.web.cinema_booking_api.exception.RecordNotFoundException;
import pwr.web.cinema_booking_api.exception.UnauthorizedDeletionException;
import pwr.web.cinema_booking_api.service.ReservationService;

import java.util.List;

@RestController
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping("/user/reservations")
    public List<ReservationDTO> createReservations(@RequestBody List<ReservationDTO> reservationDTOs)
            throws RecordNotFoundException, BadReservationsException, NoSuchUserException {
        return reservationService.createReservations(reservationDTOs);
    }

    @GetMapping("/user/reservations")
    public List<ReservationDTO> getReservations() throws NoSuchUserException {
        return reservationService.getReservations();
    }

    @PostMapping("/user/reservations/delete/{id}")
    public void deleteReservation(@PathVariable long id) throws NoSuchUserException, UnauthorizedDeletionException {
        reservationService.deleteReservation(id);
    }
}
