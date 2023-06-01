package pwr.web.cinema_booking_api.controller;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import pwr.web.cinema_booking_api.dto.ReservationDTO;
import pwr.web.cinema_booking_api.dto.ReservationWrapperDTO;
import pwr.web.cinema_booking_api.exception.BadReservationsException;
import pwr.web.cinema_booking_api.exception.NoSuchUserException;
import pwr.web.cinema_booking_api.exception.RecordNotFoundException;
import pwr.web.cinema_booking_api.exception.UnauthorizedDeletionException;
import pwr.web.cinema_booking_api.service.ReservationService;

import java.io.IOException;
import java.util.List;

@RestController
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping("/user/reservations")
    public List<ReservationDTO> createReservations(@RequestBody ReservationWrapperDTO reservationWrapper)
            throws RecordNotFoundException, BadReservationsException, NoSuchUserException {
        return reservationService.createReservations(reservationWrapper.getReservations());
    }

    @GetMapping("/user/reservations")
    public List<ReservationDTO> getReservations() throws NoSuchUserException {
        return reservationService.getReservations();
    }

    @GetMapping("/anon/reservations/screening/{id}")
    public List<ReservationDTO> getReservationsByMovieScreeningId(@PathVariable long id) {
        return reservationService.findReservationsByMovieScreeningId(id);
    }

    @PostMapping("/user/reservations/delete/{id}")
    public void deleteReservation(@PathVariable long id) throws NoSuchUserException, UnauthorizedDeletionException, RecordNotFoundException {
        reservationService.deleteReservation(id);
    }

    @PostMapping(value = "/user/reservations/pdf", produces = MimeTypeUtils.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<InputStreamResource> getReservationsPDF(@RequestBody List<ReservationDTO> reservations)
            throws RecordNotFoundException, IOException {

        MediaType contentType = MediaType.APPLICATION_PDF;
        InputStreamResource inputStreamResource = reservationService.getReservationsPDF(reservations);
        return ResponseEntity.ok().contentType(contentType).body(inputStreamResource);
    }
}
