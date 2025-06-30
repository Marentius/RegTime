package no.marentius.backend.service;

import no.marentius.backend.model.Company;
import no.marentius.backend.model.TimeEntry;
import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.cql.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class CompanyService {
    @Autowired
    private CqlSession session;

    @Autowired
    private TimeEntryService timeEntryService;

    public List<Company> getAll(String userId) {
        List<Company> companies = new ArrayList<>();
        ResultSet rs = session.execute("SELECT id, name, user_id FROM companiesuser WHERE user_id = ?", userId);
        for (Row row : rs) {
            Company c = new Company();
            c.setId(row.getString("id"));
            c.setName(row.getString("name"));
            c.setUserId(row.getString("user_id"));
            companies.add(c);
        }
        return companies;
    }

    public Company create(Company company) {
        // Sjekk om navn finnes fra før for denne brukeren
        ResultSet rs = session.execute("SELECT id FROM companiesuser WHERE user_id = ? AND name = ? ALLOW FILTERING", company.getUserId(), company.getName());
        if (rs.one() != null) {
            throw new RuntimeException("Selskap med dette navnet finnes allerede for denne brukeren");
        }
        String id = UUID.randomUUID().toString();
        session.execute(
            SimpleStatement.newInstance(
                "INSERT INTO companiesuser (user_id, id, name) VALUES (?, ?, ?)",
                company.getUserId(), id, company.getName()
            )
        );
        company.setId(id);
        return company;
    }

    public void delete(String userId, String id) {
        // 1. Finn og slett alle tilknyttede timeføringer
        List<TimeEntry> entriesToDelete = timeEntryService.getByCompanyId(userId, id);
        for (TimeEntry entry : entriesToDelete) {
            timeEntryService.deleteById(userId, entry.getId());
        }
        // 2. Slett selve selskapet
        session.execute(
            SimpleStatement.newInstance(
                "DELETE FROM companiesuser WHERE user_id = ? AND id = ?",
                userId, id
            )
        );
    }
} 