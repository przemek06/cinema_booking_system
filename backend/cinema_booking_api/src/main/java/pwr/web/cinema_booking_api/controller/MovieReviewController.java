package pwr.web.cinema_booking_api.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pwr.web.cinema_booking_api.dto.MovieReviewDTO;
import pwr.web.cinema_booking_api.exception.NoSuchUserException;
import pwr.web.cinema_booking_api.exception.RecordNotFoundException;
import pwr.web.cinema_booking_api.exception.UnauthorizedDeletionException;
import pwr.web.cinema_booking_api.service.MovieReviewService;

import java.util.List;

@RestController
public class MovieReviewController {

    private final MovieReviewService movieReviewService;

    @Autowired
    public MovieReviewController(MovieReviewService movieReviewService) {
        this.movieReviewService = movieReviewService;
    }

    @PostMapping("/user/review")
    public MovieReviewDTO addMovieReview(@RequestBody MovieReviewDTO movieReviewDTO) throws NoSuchUserException {
        return movieReviewService.addReview(movieReviewDTO);
    }

    @GetMapping("/anon/review/movie/{id}")
    public List<MovieReviewDTO> getMovieReviewsByMovieId(@PathVariable long id) {
        return movieReviewService.getReviewByMovieId(id);
    }

    @PostMapping("/user/review/delete/{id}")
    public void deleteById(@PathVariable long id) throws NoSuchUserException, UnauthorizedDeletionException, RecordNotFoundException {
        movieReviewService.deleteById(id);
    }
}
