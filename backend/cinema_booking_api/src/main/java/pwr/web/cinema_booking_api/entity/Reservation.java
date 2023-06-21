package pwr.web.cinema_booking_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import pwr.web.cinema_booking_api.dto.ReservationDTO;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "movie_screening_id")
    private MovieScreening movieScreening;
    private Integer seatRow;
    private Integer seatColumn;
    private String code;

    public ReservationDTO toDto() {
        return ReservationDTO.builder()
                .id(id)
                .user(user.toDto())
                .movieScreening(movieScreening.toDto())
                .seatRow(seatRow)
                .seatColumn(seatColumn)
                .code(code)
                .build();
    }
}
