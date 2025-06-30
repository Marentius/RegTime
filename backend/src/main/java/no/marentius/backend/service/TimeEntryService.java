package no.marentius.backend.service;

import no.marentius.backend.model.TimeEntry;
import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.cql.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class TimeEntryService {

    @Autowired
    private CqlSession session;

    public TimeEntry save(TimeEntry entry) {
        String id = UUID.randomUUID().toString();
        entry.setId(id);
        
        String insertQuery = "INSERT INTO timeentries (id, customer, description, hours, date, companyId, companyName) VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        PreparedStatement prepared = session.prepare(insertQuery);
        BoundStatement bound = prepared.bind(
            id,
            entry.getCustomer(),
            entry.getDescription(),
            entry.getHours(),
            entry.getDate(),
            entry.getCompanyId(),
            entry.getCompanyName()
        );
        
        session.execute(bound);
        return entry;
    }

    public List<TimeEntry> getAll() {
        String selectQuery = "SELECT id, customer, description, hours, date, companyId, companyName FROM timeentries";
        ResultSet rs = session.execute(selectQuery);
        
        List<TimeEntry> entries = new ArrayList<>();
        for (Row row : rs) {
            TimeEntry entry = new TimeEntry();
            entry.setId(row.getString("id"));
            entry.setCustomer(row.getString("customer"));
            entry.setDescription(row.getString("description"));
            entry.setHours(row.getDouble("hours"));
            entry.setDate(row.getString("date"));
            entry.setCompanyId(row.getString("companyId"));
            entry.setCompanyName(row.getString("companyName"));
            entries.add(entry);
        }
        return entries;
    }

    public List<TimeEntry> getByCustomer(String customer) {
        String selectQuery = "SELECT id, customer, description, hours, date, companyId, companyName FROM timeentries WHERE customer LIKE ? ALLOW FILTERING";
        
        PreparedStatement prepared = session.prepare(selectQuery);
        BoundStatement bound = prepared.bind("%" + customer + "%");
        ResultSet rs = session.execute(bound);
        
        List<TimeEntry> entries = new ArrayList<>();
        for (Row row : rs) {
            TimeEntry entry = new TimeEntry();
            entry.setId(row.getString("id"));
            entry.setCustomer(row.getString("customer"));
            entry.setDescription(row.getString("description"));
            entry.setHours(row.getDouble("hours"));
            entry.setDate(row.getString("date"));
            entry.setCompanyId(row.getString("companyId"));
            entry.setCompanyName(row.getString("companyName"));
            entries.add(entry);
        }
        return entries;
    }

    public List<TimeEntry> getByCompanyId(String companyId) {
        String selectQuery = "SELECT id, customer, description, hours, date, companyId, companyName FROM timeentries WHERE companyId = ? ALLOW FILTERING";
        
        PreparedStatement prepared = session.prepare(selectQuery);
        BoundStatement bound = prepared.bind(companyId);
        ResultSet rs = session.execute(bound);
        
        List<TimeEntry> entries = new ArrayList<>();
        for (Row row : rs) {
            TimeEntry entry = new TimeEntry();
            entry.setId(row.getString("id"));
            entry.setCustomer(row.getString("customer"));
            entry.setDescription(row.getString("description"));
            entry.setHours(row.getDouble("hours"));
            entry.setDate(row.getString("date"));
            entry.setCompanyId(row.getString("companyId"));
            entry.setCompanyName(row.getString("companyName"));
            entries.add(entry);
        }
        return entries;
    }

    public void deleteById(String id) {
        String deleteQuery = "DELETE FROM timeentries WHERE id = ?";
        
        PreparedStatement prepared = session.prepare(deleteQuery);
        BoundStatement bound = prepared.bind(id);
        session.execute(bound);
    }
}
