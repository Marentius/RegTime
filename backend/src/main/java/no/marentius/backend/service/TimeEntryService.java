package no.marentius.backend.service;

import no.marentius.backend.model.TimeEntry;
import no.marentius.backend.repository.TimeEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class TimeEntryService {

    @Autowired
    private TimeEntryRepository timeEntryRepository;

    public TimeEntry save(TimeEntry entry) {
        return timeEntryRepository.save(entry);
    }

    public List<TimeEntry> getAll(String userId) {
        return timeEntryRepository.findByUserId(userId);
    }

    public List<TimeEntry> getByCustomer(String userId, String customer) {
        List<TimeEntry> allEntries = timeEntryRepository.findByUserId(userId);
        return allEntries.stream()
            .filter(entry -> entry.getCustomer() != null && 
                           entry.getCustomer().toLowerCase().contains(customer.toLowerCase()))
            .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
    }

    public List<TimeEntry> getByCompanyId(String userId, String companyId) {
        List<TimeEntry> allEntries = timeEntryRepository.findByUserId(userId);
        return allEntries.stream()
            .filter(entry -> companyId.equals(entry.getCompanyId()))
            .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
    }

    public void deleteById(String userId, String id) {
        timeEntryRepository.deleteById(id);
    }

    public List<String> getUniqueCategories(String userId) {
        return timeEntryRepository.findDistinctCategoriesByUserId(userId);
    }
}
