package pwr.web.cinema_booking_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pwr.web.cinema_booking_api.dto.ActorDTO;
import pwr.web.cinema_booking_api.dto.CharacterDTO;
import pwr.web.cinema_booking_api.entity.Actor;
import pwr.web.cinema_booking_api.entity.Character;
import pwr.web.cinema_booking_api.entity.Movie;
import pwr.web.cinema_booking_api.repository.CharacterRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CharacterService {

    private final CharacterRepository characterRepository;
    private final ActorService actorService;

    @Autowired
    public CharacterService(CharacterRepository characterRepository, ActorService actorService) {
        this.characterRepository = characterRepository;
        this.actorService = actorService;
    }

    @Transactional
    public List<CharacterDTO> addCharacters(List<CharacterDTO> characterDTOs, Movie movie) {
        List<Character> characters = characterDTOs
                .stream()
                .map(CharacterDTO::toEntity)
                .toList();

        characters.forEach(character -> {
            Actor actor = character.getActor();
            ActorDTO existingActor = actorService.getActorByFullName(actor.getFullName());
            if (existingActor == null) {
                existingActor = actorService.addActor(actor.toDto());
            }
            character.setActor(existingActor.toEntity());
        });

        characters.forEach(character -> character.setMovie(movie));

        return characterRepository.saveAll(characters)
                .stream()
                .map(Character::toDto)
                .collect(Collectors.toList());
    }
}
