package pwr.web.cinema_booking_api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import pwr.web.cinema_booking_api.dto.CinemaHallDTO;

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

    public CinemaHallDTO toDto() {
        return CinemaHallDTO.builder()
                .id(id)
                .name(name)
                .description(description)
                .columns(columns)
                .rows(rows)
                .build();
    }
}
