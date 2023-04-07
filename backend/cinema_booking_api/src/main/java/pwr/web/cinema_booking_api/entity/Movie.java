package pwr.web.cinema_booking_api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;
import pwr.web.cinema_booking_api.dto.MovieDTO;

import java.util.List;
import java.util.stream.Collectors;

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

    public MovieDTO toDto() {
        return MovieDTO.builder()
                .id(id)
                .title(title)
                .category(category)
                .overview(overview)
                .description(description)
                .duration(duration)
                .characters(characters.stream().map(Character::toDto).collect(Collectors.toList()))
                .build();
    }
}
