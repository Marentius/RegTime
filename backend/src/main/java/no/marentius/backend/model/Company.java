package no.marentius.backend.model;

public class Company {
    private String id;
    private String name;
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