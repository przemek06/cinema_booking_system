package pwr.web.cinema_booking_api.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pwr.web.cinema_booking_api.dto.ActorDTO;
import pwr.web.cinema_booking_api.entity.Actor;
import pwr.web.cinema_booking_api.exception.RecordNotFoundException;
import pwr.web.cinema_booking_api.repository.ActorRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ActorService {

    private final ActorRepository actorRepository;

    @Autowired
    public ActorService(ActorRepository actorRepository) {
        this.actorRepository = actorRepository;
    }

    public List<ActorDTO> getActors() {
        return actorRepository.findAll().stream()
                .map(Actor::toDto)
                .collect(Collectors.toList());
    }

    public ActorDTO getActorByFullName(String fullName) {
        return actorRepository
                .findByFullName(fullName)
                .map(Actor::toDto)
                .orElse(null);
    }

    public ActorDTO addActor(ActorDTO actorDTO) {
        Actor actor = actorDTO.toEntity();
        actor.setId(null);
        return actorRepository.save(actor).toDto();
    }
}
