package pwr.web.cinema_booking_api.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pwr.web.cinema_booking_api.dto.MovieScreeningDTO;
import pwr.web.cinema_booking_api.service.MovieScreeningService;

import java.util.List;

@RestController
public class MovieScreeningController {

    private final MovieScreeningService movieScreeningService;

    @Autowired
    public MovieScreeningController(MovieScreeningService movieScreeningService) {
        this.movieScreeningService = movieScreeningService;
    }

    @GetMapping("/anon/screenings")
    public List<MovieScreeningDTO> getMovies() {
        return movieScreeningService.getMovieScreenings();
    }

    @PostMapping("/admin/screenings")
    public MovieScreeningDTO addMovie(@RequestBody MovieScreeningDTO movieScreening) {
        return movieScreeningService.addMovieScreening(movieScreening);
    }
}
