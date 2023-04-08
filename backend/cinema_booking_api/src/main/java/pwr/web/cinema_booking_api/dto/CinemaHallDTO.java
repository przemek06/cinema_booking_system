package pwr.web.cinema_booking_api.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pwr.web.cinema_booking_api.entity.CinemaHall;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CinemaHallDTO {
    private Long id;
    private String name;
    private String description;
    private Integer columns;
    private Integer rows;

    public CinemaHall toEntity(){
        return CinemaHall.builder()
                .id(id)
                .name(name)
                .description(description)
                .columns(columns)
                .rows(rows)
                .build();
    }
}
