package no.marentius.backend;

import com.datastax.oss.driver.api.core.CqlSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@Configuration
public class CassandraConfig {
    @Value("${astra.db.clientId}")
    private String clientId;
    @Value("${astra.db.clientSecret}")
    private String clientSecret;
    @Value("${astra.db.keyspace}")
    private String keyspace;

    @Bean
    public CqlSession session() throws IOException {
        // Kopier secure-connect-bundle fra classpath til temp-fil
        ClassPathResource resource = new ClassPathResource("secure-connect-bundle.zip");
        Path tempFile = Files.createTempFile("secure-connect-bundle", ".zip");
        
        // Bruk REPLACE_EXISTING for å overskrive hvis filen allerede eksisterer
        Files.copy(resource.getInputStream(), tempFile, StandardCopyOption.REPLACE_EXISTING);
        
        return CqlSession.builder()
                .withCloudSecureConnectBundle(tempFile)
                .withAuthCredentials(clientId, clientSecret)
                .withKeyspace(keyspace)
                .build();
    }
} 