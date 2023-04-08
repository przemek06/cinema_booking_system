package pwr.web.cinema_booking_api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pwr.web.cinema_booking_api.entity.Actor;
import pwr.web.cinema_booking_api.entity.Character;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CharacterDTO {
    private Long id;
    private ActorDTO actor;
    private String name;

    public Character toEntity(){
        return Character.builder()
                .id(id)
                .actor(actor.toEntity())
                .name(name)
                .build();
    }
}
