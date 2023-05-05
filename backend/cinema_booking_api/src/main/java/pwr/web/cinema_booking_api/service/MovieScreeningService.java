package pwr.web.cinema_booking_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pwr.web.cinema_booking_api.dto.MovieScreeningDTO;
import pwr.web.cinema_booking_api.entity.MovieScreening;
import pwr.web.cinema_booking_api.repository.MovieScreeningRepository;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieScreeningService {

    private final MovieScreeningRepository movieScreeningRepository;

    @Autowired
    public MovieScreeningService(MovieScreeningRepository movieScreeningRepository) {
        this.movieScreeningRepository = movieScreeningRepository;
    }

    public List<MovieScreeningDTO> getMovieScreenings() {
        return movieScreeningRepository.findAll()
                .stream()
                .map(MovieScreening::toDto)
                .collect(Collectors.toList());
    }

    private Date getDayEnd(Date dayStart) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(dayStart);
        calendar.add(Calendar.HOUR_OF_DAY, 24);
        return calendar.getTime();
    }

    public List<MovieScreeningDTO> getMovieScreeningsByDate(Date chosenDate) {
        Date dayEnd = getDayEnd(chosenDate);
        return movieScreeningRepository.getMovieScreeningsByScreeningDateBetween(chosenDate, dayEnd)
                .stream()
                .map(MovieScreening::toDto)
                .collect(Collectors.toList());
    }

    public MovieScreeningDTO addMovieScreening(MovieScreeningDTO movieScreeningDTO) {
        MovieScreening movieScreening = movieScreeningDTO.toEntity();
        return movieScreeningRepository.save(movieScreening).toDto();
    }
}
