package pwr.web.cinema_booking_api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pwr.web.cinema_booking_api.entity.MovieScreening;
import pwr.web.cinema_booking_api.entity.Reservation;
import pwr.web.cinema_booking_api.entity.User;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationDTO {
    private Long id;
    private UserDTO user;
    private MovieScreeningDTO movieScreening;
    private Integer seatRow;
    private Integer seatColumn;

    public Reservation toEntity(){
        return Reservation.builder()
                .id(id)
                .user(user.toEntity())
                .movieScreening(movieScreening.toEntity())
                .seatRow(seatRow)
                .seatColumn(seatColumn)
                .build();
    }
}
