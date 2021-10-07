package pl.dominikb.iwa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.dominikb.iwa.models.Event;
import pl.dominikb.iwa.models.Ticket;
import pl.dominikb.iwa.models.User;
import pl.dominikb.iwa.repositories.EventRepository;
import pl.dominikb.iwa.repositories.TicketRepository;
import pl.dominikb.iwa.repositories.UserRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/security/admin")
public class AdminRESTController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TicketRepository ticketRepository;

    //  EVENTS
    @PutMapping("/events")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Event> replaceEvents(@RequestBody List<Event> events) {
        this.eventRepository.deleteAll();
        this.eventRepository.saveAll(events);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/events/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Event> replaceEvent(@PathVariable("id") Long id, @RequestBody Event event) {
        event.setId(id);
        this.eventRepository.save(event);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/events/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Event> updateEvent(@PathVariable("id") Long id, @RequestBody Map<String, Object> updates) {
        Optional<Event> event = this.eventRepository.findById(id);
        if (!event.isPresent()) {
            System.out.println("There is no event with the id: " + id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        eventPartialUpdate(event.get(), updates);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/events")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Event> addEvent(@RequestBody Event event) {
        this.eventRepository.save(event);
        return new ResponseEntity<>(event, HttpStatus.CREATED);
    }

    @DeleteMapping("/events")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Event> deleteEvents() {
        this.eventRepository.deleteAll();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/events/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Event> deleteEvent(@PathVariable("id") Long id) {
        Optional<Event> event = this.eventRepository.findById(id);
        if (!event.isPresent()) {
            System.out.println("There is no event with the id: " + id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        this.eventRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private void eventPartialUpdate(Event event, Map<String, Object> updates) {
        if (updates.containsKey("city")) event.setCity((String) updates.get("city"));
        if (updates.containsKey("artist")) event.setArtist((String) updates.get("artist"));
        if (updates.containsKey("price")) event.setPrice((Float) updates.get("price"));
        this.eventRepository.save(event);
    }

    //  USERS
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getUsers() {
        return this.userRepository.findAll();
    }

    @GetMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Optional<User> getUser(@PathVariable("id") Long id) {
        Optional<User> user = this.userRepository.findById(id);
        if (!user.isPresent()) System.out.println("There is no user with the id: " + id);
        return user;
    }

    //  TICKETS
    @GetMapping("/tickets")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Ticket> getTickets() {
        return this.ticketRepository.findAll();
    }

    @GetMapping("/tickets/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Optional<Ticket> getTicket(@PathVariable("id") Long id) {
        Optional<Ticket> ticket = this.ticketRepository.findById(id);
        if (!ticket.isPresent()) System.out.println("There is no ticket with the id: " + id);
        return ticket;
    }
}
