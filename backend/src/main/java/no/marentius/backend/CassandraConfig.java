package no.marentius.backend;

import com.datastax.oss.driver.api.core.CqlSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.nio.file.Paths;

@Configuration
public class CassandraConfig {
    @Value("${astra.db.applicationToken}")
    private String applicationToken;
    @Value("${astra.db.keyspace}")
    private String keyspace;
    @Value("${astra.db.secureConnectBundle}")
    private String bundlePath;

    @Bean
    public CqlSession session() {
        return CqlSession.builder()
                .withCloudSecureConnectBundle(Paths.get("src/main/resources/secure-connect-bundle.zip"))
                .withAuthCredentials("token", applicationToken)
                .withKeyspace(keyspace)
                .build();
    }
} 