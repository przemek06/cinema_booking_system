package pwr.web.cinema_booking_api.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pwr.web.cinema_booking_api.entity.Character;
import pwr.web.cinema_booking_api.entity.Movie;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovieDTO {
    private Long id;
    private String title;
    private String category;
    private String overview;
    private String description;
    private Integer duration;
    private List<CharacterDTO> characters;

    public Movie toEntity(){
        return Movie.builder()
                .id(id)
                .title(title)
                .category(category)
                .overview(overview)
                .description(description)
                .duration(duration)
                .characters(characters != null ? characters.stream().map(CharacterDTO::toEntity).collect(Collectors.toList()) : null)
                .build();
    }

}
