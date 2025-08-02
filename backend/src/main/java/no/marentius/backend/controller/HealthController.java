package no.marentius.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.sql.DataSource;
import java.sql.Connection;

@RestController
@RequestMapping("/api/health")
public class HealthController {
    
    @Autowired
    private DataSource dataSource;
    
    /**
     * Database health check
     */
    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        try (Connection connection = dataSource.getConnection()) {
            if (connection.isValid(5)) {
                return ResponseEntity.ok("Supabase database er tilgjengelig");
            } else {
                return ResponseEntity.status(500).body("Database-tilkobling er ugyldig");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Database-feil: " + e.getMessage());
        }
    }
    
    /**
     * Database health check
     */
    @GetMapping("/database")
    public ResponseEntity<String> databaseHealth() {
        try (Connection connection = dataSource.getConnection()) {
            if (connection.isValid(5)) {
                return ResponseEntity.ok("PostgreSQL database er tilgjengelig");
            } else {
                return ResponseEntity.status(500).body("Database-tilkobling er ugyldig");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Database-feil: " + e.getMessage());
        }
    }
    
    /**
     * Enkel health check endpoint
     */
    @GetMapping
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("RegTime backend er oppe og kjører");
    }
} 