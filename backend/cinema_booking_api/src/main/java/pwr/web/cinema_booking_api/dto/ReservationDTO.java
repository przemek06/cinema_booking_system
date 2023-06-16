package pwr.web.cinema_booking_api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pwr.web.cinema_booking_api.entity.Reservation;

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
    private String code;

    public Reservation toEntity(){
        return Reservation.builder()
                .id(id)
                .user(user == null ? null : user.toEntity())
                .movieScreening(movieScreening.toEntity())
                .seatRow(seatRow)
                .seatColumn(seatColumn)
                .code(code)
                .build();
    }
}
