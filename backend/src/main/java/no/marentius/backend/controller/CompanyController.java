package no.marentius.backend.controller;

import no.marentius.backend.model.Company;
import no.marentius.backend.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/companies")
public class CompanyController {
    @Autowired
    private CompanyService service;

    @GetMapping
    public List<Company> getAll(@RequestHeader("X-USER-ID") String userId) {
        return service.getAll(userId);
    }

    @PostMapping
    public Company create(@RequestHeader("X-USER-ID") String userId, @RequestBody Company company) {
        company.setUserId(userId);
        return service.create(company);
    }

    @DeleteMapping("/{id}")
    public void delete(@RequestHeader("X-USER-ID") String userId, @PathVariable String id) {
        service.delete(userId, id);
    }
} 