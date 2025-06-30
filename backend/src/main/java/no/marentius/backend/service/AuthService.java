package no.marentius.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Value("${app.login.password}")
    private String correctPassword;

    public boolean authenticate(String password) {
        if (password == null || correctPassword == null) {
            return false;
        }
        // Trim begge strengene for å fjerne eventuelle usynlige mellomrom
        // før de sammenlignes.
        return correctPassword.trim().equals(password.trim());
    }
} 