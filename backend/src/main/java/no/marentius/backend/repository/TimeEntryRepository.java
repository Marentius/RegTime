package no.marentius.backend.repository;

import no.marentius.backend.model.TimeEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeEntryRepository extends JpaRepository<TimeEntry, String> {
    List<TimeEntry> findByUserId(String userId);
    
    @Query("SELECT DISTINCT t.category FROM TimeEntry t WHERE t.userId = ?1 AND t.category IS NOT NULL")
    List<String> findDistinctCategoriesByUserId(String userId);
} 