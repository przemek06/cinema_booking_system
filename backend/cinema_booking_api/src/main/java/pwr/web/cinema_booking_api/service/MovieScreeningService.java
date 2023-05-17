package pwr.web.cinema_booking_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pwr.web.cinema_booking_api.dto.MovieDTO;
import pwr.web.cinema_booking_api.dto.MovieScreeningDTO;
import pwr.web.cinema_booking_api.entity.MovieScreening;
import pwr.web.cinema_booking_api.exception.BadDateException;
import pwr.web.cinema_booking_api.exception.RecordNotFoundException;
import pwr.web.cinema_booking_api.repository.MovieScreeningRepository;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieScreeningService {

    private final MovieScreeningRepository movieScreeningRepository;
    private final MovieService movieService;

    @Autowired
    public MovieScreeningService(MovieScreeningRepository movieScreeningRepository, MovieService movieService) {
        this.movieScreeningRepository = movieScreeningRepository;
        this.movieService = movieService;
    }

    public MovieScreeningDTO getMovieScreeningById(long id) throws RecordNotFoundException {
        return movieScreeningRepository.findById(id).orElseThrow(RecordNotFoundException::new).toDto();
    }

    public List<MovieScreeningDTO> getMovieScreenings() {
        return movieScreeningRepository.findAll()
                .stream()
                .map(MovieScreening::toDto)
                .collect(Collectors.toList());
    }

    private Date getDayEnd(Date dayStart) {
        return getDatePlusMinutes(dayStart, 24*60);
    }

    private Date getDatePlusMinutes(Date date, Integer minutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.MINUTE, minutes);
        return calendar.getTime();
    }

    public List<MovieScreeningDTO> getMovieScreeningsByDate(Date chosenDate) {
        Date dayEnd = getDayEnd(chosenDate);
        return movieScreeningRepository.getMovieScreeningsByScreeningDateBetween(chosenDate, dayEnd)
                .stream()
                .map(MovieScreening::toDto)
                .collect(Collectors.toList());
    }

    private boolean isCinemaHallAvailable(MovieScreeningDTO movieScreeningDTO) {
        if (movieScreeningDTO.getMovie() == null || movieScreeningDTO.getMovie().getId() == null) {
            return false;
        }

        MovieDTO movie;

        try {
            movie = movieService.getMovieById(movieScreeningDTO.getMovie().getId());
        } catch (RecordNotFoundException e) {
            return false;
        }

        List<MovieScreening> screeningsAtCinemaHall = movieScreeningRepository
                .getMovieScreeningsByCinemaHallId(movieScreeningDTO.getCinemaHall().getId());

        Date startTime = movieScreeningDTO.getScreeningDate();
        Date endTime = getDatePlusMinutes(startTime, movie.getDuration());

        boolean startDuringAnotherScreening = screeningsAtCinemaHall
                .stream()
                .anyMatch(screening -> {
                    Date endOfScreening = getDatePlusMinutes(screening.getScreeningDate(), screening.getMovie().getDuration());
                    return startTime.after(screening.getScreeningDate()) && startTime.before(endOfScreening);
                });

        boolean endDuringAnotherScreening = screeningsAtCinemaHall
                .stream()
                .anyMatch(screening -> {
                    Date endOfScreening = getDatePlusMinutes(screening.getScreeningDate(), screening.getMovie().getDuration());
                    return endTime.after(screening.getScreeningDate()) && endTime.before(endOfScreening);
                });

        boolean overlappingAnotherScreening = screeningsAtCinemaHall
                .stream()
                .anyMatch(screening -> {
                    Date endOfScreening = getDatePlusMinutes(screening.getScreeningDate(), screening.getMovie().getDuration());
                    return (screening.getScreeningDate().after(startTime) || screening.getScreeningDate().equals(startTime))
                            && (endOfScreening.before(endTime) || endOfScreening.equals(endTime));
                });

        return !startDuringAnotherScreening && !endDuringAnotherScreening && !overlappingAnotherScreening;
    }

    public MovieScreeningDTO addMovieScreening(MovieScreeningDTO movieScreeningDTO) throws BadDateException {
        if (!isCinemaHallAvailable(movieScreeningDTO)) {
            throw new BadDateException();
        }
        MovieScreening movieScreening = movieScreeningDTO.toEntity();

        return movieScreeningRepository.save(movieScreening).toDto();
    }
}
