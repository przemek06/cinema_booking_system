package pwr.web.cinema_booking_api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pwr.web.cinema_booking_api.entity.Actor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CharacterDTO {
    private Long id;
    private Actor actor;
    private String name;
}
