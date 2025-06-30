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
    public List<Company> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Company create(@RequestBody Company company) {
        return service.create(company);
    }
} 