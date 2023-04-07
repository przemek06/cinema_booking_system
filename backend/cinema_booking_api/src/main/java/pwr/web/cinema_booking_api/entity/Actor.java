package pwr.web.cinema_booking_api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import pwr.web.cinema_booking_api.dto.ActorDTO;

@Entity
@Data
@NoArgsConstructor
public class Actor {
    @Id
    private Long id;
    private String fullName;

    public ActorDTO toDto() {
        return ActorDTO.builder()
                .id(id)
                .fullName(fullName)
                .build();
    }
}
