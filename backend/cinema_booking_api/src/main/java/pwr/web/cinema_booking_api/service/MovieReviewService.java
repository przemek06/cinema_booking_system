package pwr.web.cinema_booking_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pwr.web.cinema_booking_api.dto.MovieReviewDTO;
import pwr.web.cinema_booking_api.entity.MovieReview;
import pwr.web.cinema_booking_api.entity.Reservation;
import pwr.web.cinema_booking_api.entity.User;
import pwr.web.cinema_booking_api.exception.NoSuchUserException;
import pwr.web.cinema_booking_api.exception.RecordNotFoundException;
import pwr.web.cinema_booking_api.exception.UnauthorizedDeletionException;
import pwr.web.cinema_booking_api.repository.MovieReviewRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieReviewService {

    private final UserService userService;
    private final MovieReviewRepository movieReviewRepository;

    @Autowired
    public MovieReviewService(UserService userService, MovieReviewRepository movieReviewRepository) {
        this.userService = userService;
        this.movieReviewRepository = movieReviewRepository;
    }

    public MovieReviewDTO addReview(MovieReviewDTO movieReviewDTO) throws NoSuchUserException {
        User user = new User();
        long userId = userService.getId();
        user.setId(userId);
        MovieReview toSave = movieReviewDTO.toEntity();
        toSave.setUser(user);
        return movieReviewRepository.save(toSave).toDTO();
    }

    public List<MovieReviewDTO> getReviewByMovieId(long id) {
        return movieReviewRepository.findAllByMovieId(id)
                .stream()
                .map(MovieReview::toDTO)
                .collect(Collectors.toList());
    }

    public void deleteById(long id) throws NoSuchUserException, UnauthorizedDeletionException, RecordNotFoundException {
        MovieReview toDelete = movieReviewRepository.findById(id).orElseThrow(RecordNotFoundException::new);
        if (toDelete != null && toDelete.getUser() != null && userService.getId() == toDelete.getUser().getId()) {
            movieReviewRepository.deleteById(id);
        } else {
            throw new UnauthorizedDeletionException();
        }
    }
}
