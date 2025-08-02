package no.marentius.backend.service;

import no.marentius.backend.model.Company;
import no.marentius.backend.model.TimeEntry;
import no.marentius.backend.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class CompanyService {
    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private TimeEntryService timeEntryService;

    public List<Company> getAll(String userId) {
        return companyRepository.findByUserId(userId);
    }

    public Company create(Company company) {
        // Sjekk om navn finnes fra før for denne brukeren
        List<Company> existingCompanies = companyRepository.findByUserId(company.getUserId());
        boolean nameExists = existingCompanies.stream()
            .anyMatch(c -> c.getName().equalsIgnoreCase(company.getName()));
        
        if (nameExists) {
            throw new RuntimeException("Selskap med dette navnet finnes allerede for denne brukeren");
        }
        
        return companyRepository.save(company);
    }

    public void delete(String userId, String id) {
        // 1. Finn og slett alle tilknyttede timeføringer
        List<TimeEntry> entriesToDelete = timeEntryService.getByCompanyId(userId, id);
        for (TimeEntry entry : entriesToDelete) {
            timeEntryService.deleteById(userId, entry.getId());
        }
        // 2. Slett selve selskapet
        companyRepository.deleteById(id);
    }
} 