package no.marentius.backend.service;

import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.cql.*;
import no.marentius.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private CqlSession session;

    public User findByUsername(String username) {
        String query = "SELECT user_id, username, password_hash FROM users WHERE username = ? ALLOW FILTERING";
        PreparedStatement prepared = session.prepare(query);
        BoundStatement bound = prepared.bind(username);
        ResultSet rs = session.execute(bound);
        Row row = rs.one();
        if (row != null) {
            return new User(
                row.getString("user_id"),
                row.getString("username"),
                row.getString("password_hash")
            );
        }
        return null;
    }

    public User findByUserId(String userId) {
        String query = "SELECT user_id, username, password_hash FROM users WHERE user_id = ?";
        PreparedStatement prepared = session.prepare(query);
        BoundStatement bound = prepared.bind(userId);
        ResultSet rs = session.execute(bound);
        Row row = rs.one();
        if (row != null) {
            return new User(
                row.getString("user_id"),
                row.getString("username"),
                row.getString("password_hash")
            );
        }
        return null;
    }

    public User createUser(String username, String passwordHash) {
        String userId = UUID.randomUUID().toString();
        String query = "INSERT INTO users (user_id, username, password_hash) VALUES (?, ?, ?)";
        PreparedStatement prepared = session.prepare(query);
        BoundStatement bound = prepared.bind(userId, username, passwordHash);
        session.execute(bound);
        return new User(userId, username, passwordHash);
    }
} 