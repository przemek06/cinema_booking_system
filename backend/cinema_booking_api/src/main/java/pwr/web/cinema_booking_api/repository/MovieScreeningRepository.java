package pwr.web.cinema_booking_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pwr.web.cinema_booking_api.entity.MovieScreening;

import java.util.Date;
import java.util.List;

@Repository
public interface MovieScreeningRepository extends JpaRepository<MovieScreening, Long> {


    List<MovieScreening> getMovieScreeningsByScreeningDateBetween(Date dayStart, Date dayEnd);
    List<MovieScreening> getMovieScreeningsByCinemaHallId(long id);
}
