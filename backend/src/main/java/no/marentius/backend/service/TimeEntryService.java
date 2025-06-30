package no.marentius.backend.service;

import no.marentius.backend.model.TimeEntry;
import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.cql.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class TimeEntryService {

    @Autowired
    private CqlSession session;

    public TimeEntry save(TimeEntry entry) {
        String id = UUID.randomUUID().toString();
        entry.setId(id);
        String insertQuery = "INSERT INTO timeentriesuser (user_id, id, customer, description, hours, date, companyId, companyName, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        PreparedStatement prepared = session.prepare(insertQuery);
        BoundStatement bound = prepared.bind(
            entry.getUserId(),
            id,
            entry.getCustomer(),
            entry.getDescription(),
            entry.getHours(),
            entry.getDate(),
            entry.getCompanyId(),
            entry.getCompanyName(),
            entry.getCategory()
        );
        session.execute(bound);
        return entry;
    }

    public List<TimeEntry> getAll(String userId) {
        String selectQuery = "SELECT user_id, id, customer, description, hours, date, companyId, companyName, category FROM timeentriesuser WHERE user_id = ?";
        PreparedStatement prepared = session.prepare(selectQuery);
        BoundStatement bound = prepared.bind(userId);
        ResultSet rs = session.execute(bound);
        List<TimeEntry> entries = new ArrayList<>();
        for (Row row : rs) {
            TimeEntry entry = new TimeEntry();
            entry.setUserId(row.getString("user_id"));
            entry.setId(row.getString("id"));
            entry.setCustomer(row.getString("customer"));
            entry.setDescription(row.getString("description"));
            entry.setHours(row.getDouble("hours"));
            entry.setDate(row.getString("date"));
            entry.setCompanyId(row.getString("companyId"));
            entry.setCompanyName(row.getString("companyName"));
            entry.setCategory(row.getString("category"));
            entries.add(entry);
        }
        return entries;
    }

    public List<TimeEntry> getByCustomer(String userId, String customer) {
        String selectQuery = "SELECT user_id, id, customer, description, hours, date, companyId, companyName, category FROM timeentriesuser WHERE user_id = ? AND customer LIKE ? ALLOW FILTERING";
        PreparedStatement prepared = session.prepare(selectQuery);
        BoundStatement bound = prepared.bind(userId, "%" + customer + "%");
        ResultSet rs = session.execute(bound);
        List<TimeEntry> entries = new ArrayList<>();
        for (Row row : rs) {
            TimeEntry entry = new TimeEntry();
            entry.setUserId(row.getString("user_id"));
            entry.setId(row.getString("id"));
            entry.setCustomer(row.getString("customer"));
            entry.setDescription(row.getString("description"));
            entry.setHours(row.getDouble("hours"));
            entry.setDate(row.getString("date"));
            entry.setCompanyId(row.getString("companyId"));
            entry.setCompanyName(row.getString("companyName"));
            entry.setCategory(row.getString("category"));
            entries.add(entry);
        }
        return entries;
    }

    public List<TimeEntry> getByCompanyId(String userId, String companyId) {
        String selectQuery = "SELECT user_id, id, customer, description, hours, date, companyId, companyName, category FROM timeentriesuser WHERE user_id = ? AND companyId = ? ALLOW FILTERING";
        PreparedStatement prepared = session.prepare(selectQuery);
        BoundStatement bound = prepared.bind(userId, companyId);
        ResultSet rs = session.execute(bound);
        List<TimeEntry> entries = new ArrayList<>();
        for (Row row : rs) {
            TimeEntry entry = new TimeEntry();
            entry.setUserId(row.getString("user_id"));
            entry.setId(row.getString("id"));
            entry.setCustomer(row.getString("customer"));
            entry.setDescription(row.getString("description"));
            entry.setHours(row.getDouble("hours"));
            entry.setDate(row.getString("date"));
            entry.setCompanyId(row.getString("companyId"));
            entry.setCompanyName(row.getString("companyName"));
            entry.setCategory(row.getString("category"));
            entries.add(entry);
        }
        return entries;
    }

    public void deleteById(String userId, String id) {
        String deleteQuery = "DELETE FROM timeentriesuser WHERE user_id = ? AND id = ?";
        PreparedStatement prepared = session.prepare(deleteQuery);
        BoundStatement bound = prepared.bind(userId, id);
        session.execute(bound);
    }

    public List<String> getUniqueCategories(String userId) {
        String selectQuery = "SELECT category FROM timeentriesuser WHERE user_id = ? ALLOW FILTERING";
        PreparedStatement prepared = session.prepare(selectQuery);
        BoundStatement bound = prepared.bind(userId);
        ResultSet rs = session.execute(bound);
        Set<String> categories = new HashSet<>();
        for (Row row : rs) {
            String category = row.getString("category");
            if (category != null && !category.trim().isEmpty()) {
                categories.add(category);
            }
        }
        return new ArrayList<>(categories);
    }
}
