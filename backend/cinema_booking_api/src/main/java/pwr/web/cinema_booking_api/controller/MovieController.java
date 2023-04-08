package pwr.web.cinema_booking_api.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pwr.web.cinema_booking_api.dto.MovieDTO;
import pwr.web.cinema_booking_api.service.MovieService;

import java.util.List;

@RestController
public class MovieController {

    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/anon/movies")
    public List<MovieDTO> getMovies() {
        return movieService.getMovies();
    }

    @PostMapping("/admin/movies")
    public MovieDTO addMovie(@RequestBody MovieDTO movie) {
        return movieService.addMovie(movie);
    }
}
