package no.marentius.backend.controller;

import no.marentius.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        String password = payload.get("password");
        if (authService.authenticate(password)) {
            // Returnerer 200 OK ved suksess
            return ResponseEntity.ok().build();
        } else {
            // Returnerer 401 Unauthorized ved feil passord
            return ResponseEntity.status(401).body("Feil passord");
        }
    }
} 