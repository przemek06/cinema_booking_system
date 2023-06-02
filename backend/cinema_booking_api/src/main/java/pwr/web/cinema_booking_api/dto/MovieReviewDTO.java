package pwr.web.cinema_booking_api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pwr.web.cinema_booking_api.entity.Movie;
import pwr.web.cinema_booking_api.entity.MovieReview;
import pwr.web.cinema_booking_api.entity.User;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovieReviewDTO {
    private Long id;
    private MovieDTO movie;
    private UserDTO user;
    private Integer rating;
    private String description;

    public MovieReview toEntity() {
        return MovieReview.builder()
                .id(id)
                .movie(movie != null ? movie.toEntity() : null)
                .user(user != null ? user.toEntity() : null)
                .rating(rating)
                .description(description)
                .build();
    }

}
