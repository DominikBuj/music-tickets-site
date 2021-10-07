package pl.dominikb.iwa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.dominikb.iwa.models.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> { }
