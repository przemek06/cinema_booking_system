package pwr.web.cinema_booking_api.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pwr.web.cinema_booking_api.dto.MovieScreeningDTO;
import pwr.web.cinema_booking_api.exception.BadDateException;
import pwr.web.cinema_booking_api.exception.RecordNotFoundException;
import pwr.web.cinema_booking_api.service.MovieScreeningService;

import java.util.Date;
import java.util.List;

@RestController
public class MovieScreeningController {

    private final MovieScreeningService movieScreeningService;

    @Autowired
    public MovieScreeningController(MovieScreeningService movieScreeningService) {
        this.movieScreeningService = movieScreeningService;
    }

    @GetMapping("/anon/screenings")
    public List<MovieScreeningDTO> getMovieScreenings() {
        return movieScreeningService.getMovieScreenings();
    }

    @GetMapping("/anon/screenings/{id}")
    public MovieScreeningDTO getMovieScreeningById(@PathVariable long id) throws RecordNotFoundException {
        return movieScreeningService.getMovieScreeningById(id);
    }


    @GetMapping("/anon/screenings/{date}")
    public List<MovieScreeningDTO> getMovieScreeningsByDate(@PathVariable long date) {
        return movieScreeningService.getMovieScreeningsByDate(new Date(date));
    }

    @PostMapping("/admin/screenings")
    public MovieScreeningDTO addMovieScreening(@RequestBody MovieScreeningDTO movieScreening) throws BadDateException {
        return movieScreeningService.addMovieScreening(movieScreening);
    }
}
