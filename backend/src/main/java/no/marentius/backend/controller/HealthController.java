package no.marentius.backend.controller;

import no.marentius.backend.KeepAliveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/health")
public class HealthController {
    
    @Autowired
    private KeepAliveService keepAliveService;
    
    /**
     * Endpoint for eksterne monitoring-tjenester (som UptimeRobot)
     * Dette holder databasen våken ved å sende en ping
     */
    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        try {
            keepAliveService.manualKeepAlive();
            return ResponseEntity.ok("Database er våken og responsiv");
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