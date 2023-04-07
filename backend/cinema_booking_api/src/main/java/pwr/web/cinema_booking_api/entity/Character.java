package pwr.web.cinema_booking_api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Character {
    @Id
    private Long id;
    @ManyToOne
    @JoinColumn(name = "actor_id")
    private Actor actor;
    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;
    private String name;
}
