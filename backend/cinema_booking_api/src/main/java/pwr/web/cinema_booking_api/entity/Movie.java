package pwr.web.cinema_booking_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import pwr.web.cinema_booking_api.dto.MovieDTO;

import java.util.List;
import java.util.stream.Collectors;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String category;
    @Column(length = 1024)
    private String overview;
    private String description;
    private String image;
    private Integer duration;
    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
    private List<Character> characters;

    public MovieDTO toDto() {
        return MovieDTO.builder()
                .id(id)
                .title(title)
                .category(category)
                .overview(overview)
                .description(description)
                .image(image)
                .duration(duration)
                .characters(characters != null ? characters.stream().map(Character::toDto).collect(Collectors.toList()): null)
                .build();
    }
}
