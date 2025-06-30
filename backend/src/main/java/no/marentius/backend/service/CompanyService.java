package no.marentius.backend.service;

import no.marentius.backend.model.Company;
import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.cql.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class CompanyService {
    @Autowired
    private CqlSession session;

    public List<Company> getAll() {
        List<Company> companies = new ArrayList<>();
        ResultSet rs = session.execute("SELECT id, name FROM companies");
        for (Row row : rs) {
            Company c = new Company();
            c.setId(row.getUuid("id").toString());
            c.setName(row.getString("name"));
            companies.add(c);
        }
        return companies;
    }

    public Company create(Company company) {
        // Sjekk om navn finnes fra før
        ResultSet rs = session.execute("SELECT id FROM companies WHERE name = ? ALLOW FILTERING", company.getName());
        if (rs.one() != null) {
            throw new RuntimeException("Selskap med dette navnet finnes allerede");
        }
        UUID id = UUID.randomUUID();
        session.execute(
            SimpleStatement.newInstance(
                "INSERT INTO companies (id, name) VALUES (?, ?)",
                id, company.getName()
            )
        );
        company.setId(id.toString());
        return company;
    }
} 