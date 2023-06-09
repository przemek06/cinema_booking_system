package pwr.web.cinema_booking_api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pwr.web.cinema_booking_api.entity.CinemaHall;
import pwr.web.cinema_booking_api.entity.Movie;
import pwr.web.cinema_booking_api.entity.MovieScreening;

import java.util.Date;
import java.util.Locale;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovieScreeningDTO {
    private Long id;
    private MovieDTO movie;
    private CinemaHallDTO cinemaHall;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm", timezone = "Poland")
    private Date screeningDate;
    private Integer basePrice;

    public MovieScreening toEntity(){
        return MovieScreening.builder()
                .id(id)
                .movie(movie == null ? null : movie.toEntity())
                .screeningDate(screeningDate)
                .basePrice(basePrice)
                .cinemaHall(cinemaHall == null ? null : cinemaHall.toEntity())
                .build();
    }
}
