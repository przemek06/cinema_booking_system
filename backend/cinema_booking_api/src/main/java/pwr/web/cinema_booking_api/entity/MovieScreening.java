package pwr.web.cinema_booking_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import pwr.web.cinema_booking_api.dto.MovieScreeningDTO;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovieScreening {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "movie_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Movie movie;
    @ManyToOne
    @JoinColumn(name = "cinema_hall_id")
    private CinemaHall cinemaHall;
    private Date screeningDate;
    private Integer basePrice;

    public MovieScreeningDTO toDto() {
        return MovieScreeningDTO.builder()
                .id(id)
                .movie(movie.toDto())
                .cinemaHall(cinemaHall.toDto())
                .screeningDate(screeningDate)
                .basePrice(basePrice)
                .build();
    }
}
