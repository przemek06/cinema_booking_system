package pwr.web.cinema_booking_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pwr.web.cinema_booking_api.dto.CinemaHallDTO;
import pwr.web.cinema_booking_api.entity.CinemaHall;
import pwr.web.cinema_booking_api.repository.CinemaHallRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CinemaHallService {

    private final CinemaHallRepository cinemaHallRepository;

    @Autowired
    public CinemaHallService(CinemaHallRepository cinemaHallRepository) {
        this.cinemaHallRepository = cinemaHallRepository;
    }

    public List<CinemaHallDTO> getCinemaHalls() {
        return cinemaHallRepository.findAll()
                .stream()
                .map(CinemaHall::toDto)
                .collect(Collectors.toList());
    }

    public CinemaHallDTO addCinemaHall(CinemaHallDTO cinemaHallDTO) {
        CinemaHall cinemaHall = cinemaHallDTO.toEntity();
        return cinemaHallRepository.save(cinemaHall).toDto();
    }
}
