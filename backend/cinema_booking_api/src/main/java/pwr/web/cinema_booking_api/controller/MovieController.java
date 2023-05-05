package pwr.web.cinema_booking_api.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pwr.web.cinema_booking_api.dto.MovieDTO;
import pwr.web.cinema_booking_api.exception.RecordNotFoundException;
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

    @GetMapping("/anon/movies/{id}")
    public MovieDTO getMovieById(@PathVariable long id) throws RecordNotFoundException {
        return movieService.getMovieById(id);
    }
    @PostMapping("/admin/movies")
    public MovieDTO addMovie(@RequestBody MovieDTO movie) {
        return movieService.addMovie(movie);
    }
}
