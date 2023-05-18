package pwr.web.cinema_booking_api.exception;

public class NoSuchUserException extends Exception {

    public NoSuchUserException(){
        super("User doesn't exist.");
    }

}
