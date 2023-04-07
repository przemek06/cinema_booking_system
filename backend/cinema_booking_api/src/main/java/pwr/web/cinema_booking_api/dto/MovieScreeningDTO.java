package pwr.web.cinema_booking_api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pwr.web.cinema_booking_api.entity.CinemaHall;
import pwr.web.cinema_booking_api.entity.Movie;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovieScreeningDTO {
    private Long id;
    private MovieDTO movie;
    private CinemaHallDTO cinemaHall;
    private Date screeningDate;
    private Integer basePrice;
}
