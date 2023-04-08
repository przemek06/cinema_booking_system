package pwr.web.cinema_booking_api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pwr.web.cinema_booking_api.entity.User;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String username;
    private String password;
    private String role;
    private String fullName;

    public User toEntity(){
        return User.builder()
                .id(id)
                .fullName(fullName)
                .role(role)
                .username(username)
                .password(password)
                .build();
    }
}
