package pwr.web.cinema_booking_api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;
import pwr.web.cinema_booking_api.dto.MovieScreeningDTO;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class MovieScreening {
    @Id
    private Long id;
    @ManyToOne
    @JoinColumn(name = "movie_id")
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
