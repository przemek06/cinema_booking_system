package pwr.web.cinema_booking_api.exception;

public class BadDateException extends Exception {

    public BadDateException(){
        super("Date is not available.");
    }

}
