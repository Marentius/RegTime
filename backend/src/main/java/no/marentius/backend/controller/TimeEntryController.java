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
    public TimeEntry create(@RequestBody TimeEntry entry) {
        return service.save(entry);
    }

    @GetMapping
    public List<TimeEntry> getAll() {
        return service.getAll();
    }

    @GetMapping("/kunde/{name}")
    public List<TimeEntry> getByCustomer(@PathVariable String name) {
        return service.getByCustomer(name);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.deleteById(id);
    }

    @GetMapping("/selskap/{companyId}")
    public List<TimeEntry> getByCompanyId(@PathVariable String companyId) {
        return service.getByCompanyId(companyId);
    }

}
