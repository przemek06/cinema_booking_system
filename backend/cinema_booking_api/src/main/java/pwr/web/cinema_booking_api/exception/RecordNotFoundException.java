package pwr.web.cinema_booking_api.exception;

public class RecordNotFoundException extends Exception {

    public RecordNotFoundException(){
        super("Record not found.");
    }

}
