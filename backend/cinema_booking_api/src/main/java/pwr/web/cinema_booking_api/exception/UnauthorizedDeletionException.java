package pwr.web.cinema_booking_api.exception;

public class UnauthorizedDeletionException extends Exception {
    public UnauthorizedDeletionException(){
        super("The reservation doesn't belong to this user");
    }
}
