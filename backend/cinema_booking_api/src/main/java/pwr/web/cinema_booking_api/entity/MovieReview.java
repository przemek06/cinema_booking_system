package pwr.web.cinema_booking_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import pwr.web.cinema_booking_api.dto.MovieReviewDTO;
import pwr.web.cinema_booking_api.dto.MovieScreeningDTO;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "movie_id", "user_id" })})
public class MovieReview {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "movie_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Movie movie;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;
    private Integer rating;
    private String description;

    public MovieReviewDTO toDTO() {
        return MovieReviewDTO.builder()
                .id(id)
                .movie(movie != null ? movie.toDto() : null)
                .user(user != null ? user.toDto() : null)
                .rating(rating)
                .description(description)
                .build();
    }
}
