package pwr.web.cinema_booking_api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;
import pwr.web.cinema_booking_api.dto.ReservationDTO;

@Entity
@Data
@NoArgsConstructor
public class Reservation {
    @Id
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "movie_screening_id")
    private MovieScreening movieScreening;
    private Integer seatRow;
    private Integer seatColumn;

    public ReservationDTO toDto() {
        return ReservationDTO.builder()
                .id(id)
                .user(user.toDto())
                .movieScreening(movieScreening.toDto())
                .seatRow(seatRow)
                .seatColumn(seatColumn)
                .build();
    }
}
