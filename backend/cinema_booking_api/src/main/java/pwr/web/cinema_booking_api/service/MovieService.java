package pwr.web.cinema_booking_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pwr.web.cinema_booking_api.dto.CharacterDTO;
import pwr.web.cinema_booking_api.dto.MovieDTO;
import pwr.web.cinema_booking_api.entity.Character;
import pwr.web.cinema_booking_api.entity.Movie;
import pwr.web.cinema_booking_api.exception.RecordNotFoundException;
import pwr.web.cinema_booking_api.repository.MovieRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieService {

    private final MovieRepository movieRepository;
    private final CharacterService characterService;

    @Autowired
    public MovieService(MovieRepository movieRepository, CharacterService characterService) {
        this.movieRepository = movieRepository;
        this.characterService = characterService;
    }

    public List<MovieDTO> getMovies() {
        return movieRepository.findAll().stream()
                .map(Movie::toDto)
                .collect(Collectors.toList());
    }

    public MovieDTO getMovieById(long id) throws RecordNotFoundException {
        return movieRepository
                .findById(id)
                .orElseThrow(RecordNotFoundException::new)
                .toDto();
    }

    public MovieDTO addMovie(MovieDTO movieDTO) {
        Movie movie = movieDTO.toEntity();
        movie.setCharacters(null);
        Movie savedMovie = movieRepository.save(movie);

        List<Character> savedCharacters = characterService.addCharacters(movieDTO.getCharacters(), savedMovie)
                .stream()
                .map(CharacterDTO::toEntity)
                .collect(Collectors.toList());
        savedMovie.setCharacters(savedCharacters);

        return savedMovie.toDto();
    }

    public void deleteMovie(long id) {
        movieRepository.deleteById(id);
    }
}
