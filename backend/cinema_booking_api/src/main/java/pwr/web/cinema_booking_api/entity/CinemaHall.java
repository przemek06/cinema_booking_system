package pwr.web.cinema_booking_api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class CinemaHall {
    @Id
    private Long id;
    private String name;
    private String description;
    private Integer columns;
    private Integer rows;
}
