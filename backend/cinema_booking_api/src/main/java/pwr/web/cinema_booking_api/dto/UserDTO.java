package pwr.web.cinema_booking_api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
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

    @NotNull
    private String password;
    @NotNull
    @Email
    private String email;
    private String role;
    private String fullName;

    public User toEntity(){
        return User.builder()
                .id(id)
                .fullName(fullName)
                .role(role)
                .password(password)
                .email(email)
                .build();
    }
}
