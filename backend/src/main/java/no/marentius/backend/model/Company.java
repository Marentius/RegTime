package no.marentius.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "companies")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(name = "user_id", nullable = false)
    private String userId;

    public Company() {}

    public Company(String id, String name) {
        this.id = id;
        this.name = name;
    }
    
    public String getId() { 
        return id; 
    }

    public void setId(String id) {
         this.id = id;
         }

    public String getName() { 
        return name; 
    }

    public void setName(String name) {
        this.name = name; 
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
} 