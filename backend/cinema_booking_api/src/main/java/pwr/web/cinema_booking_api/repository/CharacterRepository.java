package pwr.web.cinema_booking_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pwr.web.cinema_booking_api.entity.Character;

@Repository
public interface CharacterRepository extends JpaRepository<Character, Long> {
}
