package pwr.web.cinema_booking_api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pwr.web.cinema_booking_api.dto.CinemaHallDTO;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CinemaHall {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
