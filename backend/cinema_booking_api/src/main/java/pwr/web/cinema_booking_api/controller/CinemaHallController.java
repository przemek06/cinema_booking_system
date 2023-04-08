package pwr.web.cinema_booking_api.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pwr.web.cinema_booking_api.dto.CinemaHallDTO;
import pwr.web.cinema_booking_api.service.CinemaHallService;

import java.util.List;

@RestController
public class CinemaHallController {

    private final CinemaHallService cinemaHallService;

    @Autowired
    public CinemaHallController(CinemaHallService cinemaHallService) {
        this.cinemaHallService = cinemaHallService;
    }

    @GetMapping("/anon/halls")
    public List<CinemaHallDTO> getCinemaHalls() {
        return cinemaHallService.getCinemaHalls();
    }

    @PostMapping("/admin/halls")
    public CinemaHallDTO addMovie(@RequestBody CinemaHallDTO cinemaHall) {
        return cinemaHallService.addCinemaHall(cinemaHall);
    }
}
