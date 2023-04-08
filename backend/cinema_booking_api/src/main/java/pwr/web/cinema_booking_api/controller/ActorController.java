package pwr.web.cinema_booking_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pwr.web.cinema_booking_api.dto.ActorDTO;
import pwr.web.cinema_booking_api.dto.MovieDTO;
import pwr.web.cinema_booking_api.service.ActorService;

import java.util.List;

@RestController
public class ActorController {

    private final ActorService actorService;

    @Autowired
    public ActorController(ActorService actorService) {
        this.actorService = actorService;
    }

    @GetMapping("/anon/actors")
    public List<ActorDTO> getActors() {
        return actorService.getActors();
    }

    @PostMapping("/admin/actors")
    public ActorDTO addActor(@RequestBody ActorDTO actor) {
        return actorService.addActor(actor);
    }
}
