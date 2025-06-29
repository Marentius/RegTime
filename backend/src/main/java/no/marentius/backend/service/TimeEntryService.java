package no.marentius.backend.service;

import no.marentius.backend.model.TimeEntry;
import java.util.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

@Service
public class TimeEntryService {

    @Value("${astradb.base-url}")
    private String baseUrl;

    @Value("${astradb.token}")
    private String token;

    private final RestTemplate restTemplate;
    private final ObjectMapper mapper = new ObjectMapper();

    public TimeEntryService() {
        this.restTemplate = new RestTemplate();
    }

    public TimeEntry save(TimeEntry entry) {
        HttpHeaders headers = createHeaders();
        entry.setId(UUID.randomUUID().toString());
        HttpEntity<TimeEntry> request = new HttpEntity<>(entry, headers);
        restTemplate.postForEntity(baseUrl + "/collections/timer", request, String.class);
        return entry;
    }

    public List<TimeEntry> getAll() {
        return fetch("/collections/timer");
    }

    public List<TimeEntry> getByCustomer(String customer) {
        String where = String.format("?where={\"customer\":{\"$eq\":\"%s\"}}", customer);
        return fetch("/collections/timer" + where);
    }

    private List<TimeEntry> fetch(String path) {
        HttpHeaders headers = createHeaders();
        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(baseUrl + path, HttpMethod.GET, request, Map.class);
        Object data = response.getBody().get("data");
        return mapper.convertValue(data, mapper.getTypeFactory().constructCollectionType(List.class, TimeEntry.class));
    }

    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Cassandra-Token", token);
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }
}
