package pwr.web.cinema_booking_api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import pwr.web.cinema_booking_api.dto.UserDTO;

@Table(name = "_user")
@Entity
@Data
@NoArgsConstructor
public class User {
    @Id
    private Long id;
    private String username;
    private String password;
    private String role;
    private String fullName;

    public UserDTO toDto() {
        return UserDTO.builder()
                .id(id)
                .fullName(fullName)
                .username(username)
                .role(role)
                .build();
    }
}
