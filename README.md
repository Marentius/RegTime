# RegTime

**RegTime** is a complete, cloud-based system for easy and secure time tracking, built with modern technologies:
- **Backend:** Spring Boot (Java 21) with PostgreSQL (Supabase)
- **Frontend:** Next.js (React) with Material UI
- **Deployment:** Backend on Raspberry Pi via Cloudflare Zero Trust Tunnel, Frontend on Vercel

## Features

- **User Authentication:** Register and log in with username and password.
- **Customer and Category Management:** Create, search and manage customers and categories.
- **Time Tracking:**  
  - Track time with customer, description, category, date and number of hours.
  - **Bulk Registration:** Add multiple time entries simultaneously in one form.
- **Calendar:** View all entries in a modern, color-coded calendar (monthly view).
- **Summary and Reports:** Get overview of hours per customer and category, filter by year/month, and download reports as Excel.
- **Responsive and User-Friendly Interface:** Modern design with Material UI, optimized for both desktop and mobile.

---

## Technical Overview

### Backend (Spring Boot)
- **API:** REST endpoints for authentication, customers, time entries and categories
- **Database:** PostgreSQL (Supabase) – scalable, cloud-based SQL database
- **Security:** Spring Security with CORS setup for frontend integration
- **Containerization:** Docker container for easy deployment
- **Structure:**
  - `controller/` – REST API for auth, customers, time entries
  - `service/` – Business logic and database access
  - `model/` – Java models for user, customer, time entry
  - `repository/` – JPA repositories for database access

### Frontend (Next.js)
- **UI:** Material UI (MUI) for modern, accessible design.
- **State management:** React hooks.
- **Functional Components:**
  - **RegisterTimeModal:** Dynamic form for one or multiple time entries.
  - **CompanyGrid/CompanyCard:** Overview and administration of customers.
  - **CalendarModal:** Calendar with color codes and details for each entry.
  - **SummaryModal:** Summary, filtering and export to Excel.
  - **Authentication:** Dedicated page for login and registration.
- **API Handling:** Dedicated `api.js` for all backend communication.
 
---

## Usage Examples

- **Track Time:**  
  Fill out one or more rows in the form, select customer, category, date and hours. Click "Register" to save everything at once.
- **Calendar:**  
  View all entries in an overview calendar. Click on an entry for details.
- **Summary:**  
  Get overview of hours per customer/category, filter by year/month, and download report as Excel.

---

## Deployment

RegTime is set up with the following architecture:

- **Backend:** Runs as Docker container on Raspberry Pi, exposed via Cloudflare Zero Trust Tunnel at `RTapi.marentius.com`
- **Frontend:** Deployed on Vercel and available at `regtime.marentius.com`
- **Database:** PostgreSQL on Supabase (cloud-based)

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Quick Start (Development)

**Backend:**
```bash
cd backend
mvn clean package
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Backend runs on `http://localhost:8080/api` and frontend on `http://localhost:3000` for local development.

---

## Technologies

- **Backend:** 
  - Spring Boot 3.5.3
  - Java 21
  - PostgreSQL (Supabase)
  - Spring Data JPA
  - Spring Security
  - Maven
  - Docker (Alpine Linux)
- **Frontend:** 
  - Next.js 15.3.4
  - React 19
  - Material UI 7
  - ExcelJS (for export)
  - JavaScript (ES6+)
- **Deployment:**
  - Docker & Docker Compose
  - GitHub Container Registry (GHCR)
  - Cloudflare Zero Trust Tunnel
  - Vercel (Frontend hosting)

---
