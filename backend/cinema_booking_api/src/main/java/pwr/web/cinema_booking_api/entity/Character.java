package pwr.web.cinema_booking_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pwr.web.cinema_booking_api.dto.ActorDTO;
import pwr.web.cinema_booking_api.dto.CharacterDTO;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Character {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "actor_id")
    private Actor actor;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id")
    private Movie movie;
    private String name;

    public CharacterDTO toDto() {
        return CharacterDTO.builder()
                .id(id)
                .name(name)
                .actor(actor.toDto())
                .build();
    }
}
