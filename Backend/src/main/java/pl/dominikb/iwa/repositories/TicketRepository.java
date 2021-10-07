package pl.dominikb.iwa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.dominikb.iwa.models.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

}
