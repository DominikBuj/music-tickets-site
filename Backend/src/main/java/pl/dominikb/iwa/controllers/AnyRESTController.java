package pl.dominikb.iwa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.dominikb.iwa.models.Event;
import pl.dominikb.iwa.repositories.EventRepository;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class AnyRESTController {

    @Autowired
    private EventRepository eventRepository;

    //  EVENTS
    @GetMapping("/events")
    public List<Event> getEvents() {
        return this.eventRepository.findAll();
    }

    @GetMapping("/events/{id}")
    public Optional<Event> getEvent(@PathVariable("id") Long id) {
        Optional<Event> event = this.eventRepository.findById(id);
        if (!event.isPresent()) System.out.println("There is no event with the id: " + id);
        return event;
    }
}
