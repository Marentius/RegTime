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
        String username = payload.get("username");
        String password = payload.get("password");
        String userId = authService.authenticate(username, password);
        if (userId != null) {
            // Returnerer userId ved suksess
            return ResponseEntity.ok(Map.of("userId", userId));
        } else {
            // Returnerer 401 Unauthorized med JSON ved feil brukernavn/passord
            return ResponseEntity.status(401).body(Map.of("error", "Feil brukernavn eller passord"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String password = payload.get("password");
        if (authService.getUserService().findByUsername(username) != null) {
            return ResponseEntity.status(409).body(Map.of("error", "Brukernavn er allerede i bruk"));
        }
        String hashedPassword = org.springframework.security.crypto.bcrypt.BCrypt.hashpw(password, org.springframework.security.crypto.bcrypt.BCrypt.gensalt());
        authService.getUserService().createUser(username, hashedPassword);
        return ResponseEntity.ok(Map.of("message", "Bruker opprettet!"));
    }
} 