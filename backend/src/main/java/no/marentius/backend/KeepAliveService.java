package no.marentius.backend;

import com.datastax.oss.driver.api.core.CqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class KeepAliveService {
    
    private static final Logger logger = LoggerFactory.getLogger(KeepAliveService.class);
    
    @Autowired
    private CqlSession session;
    
    /**
     * Sender en enkel forespørsel til databasen hver time for å holde den våken
     * Dette forhindrer at AstraDB går i sleep mode
     */
    @Scheduled(fixedRate = 3600000) // Hver time (3600000 ms = 1 time)
    public void keepDatabaseAlive() {
        try {
            // Enkel SELECT 1 forespørsel som holder databasen våken
            session.execute("SELECT * FROM users LIMIT 1");
            logger.info("Keep-alive ping sendt til AstraDB - database holdes våken");
        } catch (Exception e) {
            logger.error("Feil ved keep-alive ping til AstraDB: {}", e.getMessage());
        }
    }
    
    /**
     * Alternativ metode som kan kalles manuelt
     */
    public void manualKeepAlive() {
        keepDatabaseAlive();
    }
} 