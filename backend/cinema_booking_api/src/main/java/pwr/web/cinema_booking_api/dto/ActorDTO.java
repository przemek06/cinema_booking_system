package pwr.web.cinema_booking_api.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pwr.web.cinema_booking_api.entity.Actor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ActorDTO {
    private Long id;
    private String fullName;

    public Actor toEntity() {
        return Actor.builder()
                .id(id)
                .fullName(fullName)
                .build();
    }

}
