package pwr.web.cinema_booking_api.exception;

public class BadReservationsException extends Exception {

    public BadReservationsException(){
        super("Reservation not permitted");
    }

}
