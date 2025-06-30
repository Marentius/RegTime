package no.marentius.backend.controller;

import no.marentius.backend.model.TimeEntry;
import no.marentius.backend.service.TimeEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/timer")
public class TimeEntryController {

    @Autowired
    private TimeEntryService service;

    @PostMapping
    public TimeEntry create(@RequestHeader("X-USER-ID") String userId, @RequestBody TimeEntry entry) {
        entry.setUserId(userId);
        return service.save(entry);
    }

    @GetMapping
    public List<TimeEntry> getAll(@RequestHeader("X-USER-ID") String userId) {
        return service.getAll(userId);
    }

    @GetMapping("/kunde/{name}")
    public List<TimeEntry> getByCustomer(@RequestHeader("X-USER-ID") String userId, @PathVariable String name) {
        return service.getByCustomer(userId, name);
    }

    @DeleteMapping("/{id}")
    public void delete(@RequestHeader("X-USER-ID") String userId, @PathVariable String id) {
        service.deleteById(userId, id);
    }

    @GetMapping("/selskap/{companyId}")
    public List<TimeEntry> getByCompanyId(@RequestHeader("X-USER-ID") String userId, @PathVariable String companyId) {
        return service.getByCompanyId(userId, companyId);
    }

    @GetMapping("/categories")
    public List<String> getUniqueCategories(@RequestHeader("X-USER-ID") String userId) {
        return service.getUniqueCategories(userId);
    }

}
