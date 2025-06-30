package no.marentius.backend.service;

import no.marentius.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserService userService;

    public String authenticate(String username, String password) {
        User user = userService.findByUsername(username);
        System.out.println("Brukernavn: " + username);
        if (user == null) {
            System.out.println("Fant ikke bruker i DB");
            return null;
        }
        System.out.println("Hash fra DB: " + user.getPasswordHash());
        System.out.println("Sjekker passord: " + password);
        boolean match = BCrypt.checkpw(password, user.getPasswordHash());
        System.out.println("BCrypt.checkpw: " + match);
        if (match) {
            return user.getUserId();
        }
        return null;
    }

    public UserService getUserService() {
        return userService;
    }
}