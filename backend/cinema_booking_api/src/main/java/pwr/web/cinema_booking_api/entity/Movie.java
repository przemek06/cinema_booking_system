package pwr.web.cinema_booking_api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Movie {
    @Id
    private Long id;
    private String title;
    private String category;
    private String overview;
    private String description;
    private Integer duration;
    @OneToMany(mappedBy = "character")
    private List<Character> characters;
}
