package pl.dominikb.iwa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.dominikb.iwa.models.Ticket;
import pl.dominikb.iwa.models.User;
import pl.dominikb.iwa.repositories.TicketRepository;
import pl.dominikb.iwa.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/security/user")
public class UserRESTController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TicketRepository ticketRepository;

    //  TICKETS
    @GetMapping("/users/{username}/tickets")
    @PreAuthorize("hasRole('USER')")
    public List<Ticket> getUserTickets(@PathVariable("username") String username) {
        Optional<User> user = this.userRepository.findByUsername(username);
        if (!user.isPresent()) {
            System.out.println("There is no user with the username: " + username);
            return new ArrayList<>();
        }
        return user.get().getTickets();
    }

    @GetMapping("/users/{username}/tickets/{ticketId}")
    @PreAuthorize("hasRole('USER')")
    public Optional<Ticket> getUserTicket(@PathVariable("username") String username, @PathVariable("ticketId") Long ticketId) {
        Optional<User> user = this.userRepository.findByUsername(username);
        Optional<Ticket> ticket = Optional.empty();
        if (!user.isPresent()) {
            System.out.println("There is no user with the username: " + username);
            return ticket;
        }

        List<Ticket> tickets = user.get().getTickets();
        for (Ticket tempTicket: tickets) {
            if (!ticket.isPresent() && tempTicket.getId().equals(ticketId)) ticket = Optional.of(tempTicket);
        }

        if (!ticket.isPresent()) System.out.println("Ticket of id" + ticketId + "is not assigned to a user");
        return ticket;
    }

    @PostMapping("/users/{username}/tickets")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Ticket> addUserTicket(@PathVariable("username") String username, @RequestBody Ticket ticket) {
        Optional<User> user = this.userRepository.findByUsername(username);
        if (!user.isPresent()) {
            System.out.println("There is no user with the username: " + username);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        ticket.setUser(user.get());
        this.ticketRepository.save(ticket);
        user.get().addTicket(ticket);
        this.userRepository.save(user.get());
        return new ResponseEntity<>(ticket, HttpStatus.CREATED);
    }

    @DeleteMapping("/users/{username}/tickets")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Ticket> deleteUserTickets(@PathVariable("username") String username) {
        Optional<User> user = this.userRepository.findByUsername(username);
        if (!user.isPresent()) {
            System.out.println("There is no user with the username: " + username);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        user.get().getTickets().forEach(ticket -> user.get().removeTicket(ticket));
        this.userRepository.save(user.get());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/users/{username}/tickets/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Ticket> deleteUserTicket(@PathVariable("username") String username, @PathVariable("id") Long id) {
        Optional<Ticket> ticket = this.ticketRepository.findById(id);
        if (!ticket.isPresent()) {
            System.out.println("There is no ticket with the id: " + id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        User user = ticket.get().getUser();
        if (user == null) {
            System.out.println("Ticket is not assigned to a user.");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else if (!user.getUsername().equals(username)) {
            System.out.println("Ticket is assigned to a wrong user");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        user.removeTicket(ticket.get());
        this.userRepository.save(user);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
