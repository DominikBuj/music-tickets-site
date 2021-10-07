package pl.dominikb.iwa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.dominikb.iwa.models.User;
import pl.dominikb.iwa.repositories.UserRepository;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/security/either")
public class EitherRESTController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users/{username}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public Optional<User> getCurrentUser(@PathVariable("username") String username) {
        Optional<User> user = this.userRepository.findByUsername(username);
        if (!user.isPresent()) System.out.println("There is no user with the username: " + username);
        return user;
    }
}
