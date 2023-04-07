package pwr.web.cinema_booking_api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Actor {
    @Id
    private Long id;
    private String fullName;
}
