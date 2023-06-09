package pwr.web.cinema_booking_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pwr.web.cinema_booking_api.dto.UserDTO;

@Table(name = "_user")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique=true)
    private String email;
    private String password;

    private String role;
    private String fullName;

    public UserDTO toDto() {
        return UserDTO.builder()
                .id(id)
                .fullName(fullName)
                .email(email)
                .role(role)
                .build();
    }
}
