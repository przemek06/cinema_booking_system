package pwr.web.cinema_booking_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.io.IOException;

@ControllerAdvice
public class ErrorHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({RecordNotFoundException.class})
    public ResponseEntity<String> handleRecordNotFoundException(RecordNotFoundException ex){
        System.out.println("error");
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({BadDateException.class})
    public ResponseEntity<String> handleBadDateException(BadDateException ex){
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({BadReservationsException.class})
    public ResponseEntity<String> handleBadReservationsException(BadReservationsException ex){
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({NoSuchUserException.class})
    public ResponseEntity<String> handleNoSuchUserException(NoSuchUserException ex){
        System.out.println("error2");
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({IOException.class})
    public ResponseEntity<String> handleIOException(IOException ex){
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

