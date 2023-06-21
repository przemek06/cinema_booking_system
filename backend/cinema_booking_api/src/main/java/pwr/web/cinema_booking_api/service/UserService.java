package pwr.web.cinema_booking_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pwr.web.cinema_booking_api.dto.UserDTO;
import pwr.web.cinema_booking_api.entity.User;
import pwr.web.cinema_booking_api.exception.NoSuchUserException;
import pwr.web.cinema_booking_api.repository.UserRepository;
import pwr.web.cinema_booking_api.security.UserDetailsImpl;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public List<UserDTO> getUsers() {
        return userRepository.findAll().stream()
                .map(User::toDto)
                .collect(Collectors.toList());
    }

    private Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
    public String getRole(){
        Authentication authentication = getAuthentication();

        return authentication.getAuthorities().stream().findFirst().orElseThrow().getAuthority();
    }

    public long getId() throws NoSuchUserException {
        Authentication authentication = getAuthentication();

        if (authentication.getPrincipal() instanceof UserDetailsImpl) {
            return ((UserDetailsImpl)authentication.getPrincipal()).getId();
        }

        throw  new NoSuchUserException();
    }

    public User getUser() throws NoSuchUserException {
        long id = getId();

        return userRepository
                .findById(id)
                .orElseThrow(NoSuchUserException::new);
    }

    public UserDTO addUser(UserDTO userDTO) {
        User user = userDTO.toEntity();
        user.setRole("USER");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        return savedUser.toDto();
    }
}
