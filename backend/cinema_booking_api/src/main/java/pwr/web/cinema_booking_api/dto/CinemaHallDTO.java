package pwr.web.cinema_booking_api.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
