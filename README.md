# RegTime

**RegTime** er et komplett, skybasert system for enkel og sikker timeregistrering, utviklet med moderne teknologier:
- **Backend:** Spring Boot (Java) med Cassandra (AstraDB)
- **Frontend:** Next.js (React) med Material UI

## Hovedfunksjoner

- **Brukerautentisering:** Registrer og logg inn med brukernavn og passord.
- **Kunde- og kategorihåndtering:** Opprett, søk og administrer kunder og kategorier.
- **Timeregistrering:**  
  - Registrer timer med kunde, beskrivelse, kategori, dato og antall timer.
  - **Masseregistrering:** Legg til flere timeføringer samtidig i ett skjema.
- **Kalender:** Vis alle registreringer i en moderne, fargekodet kalender (månedvisning).
- **Summering og rapport:** Få oversikt over timer per kunde og kategori, filtrer på år/måned, og last ned rapport som Excel.
- **Responsivt og brukervennlig grensesnitt:** Moderne design med Material UI, tilpasset både desktop og mobil.

---

## Teknisk oversikt

### Backend (Spring Boot)
- **API:** REST-endepunkter for autentisering, kunder, timer og kategorier.
- **Database:** AstraDB (Cassandra) – skalerbar, skybasert NoSQL.
- **Sikkerhet:** Spring Security med CORS-oppsett for frontend-integrasjon.
- **Struktur:**
  - `controller/` – REST API for auth, kunder, timer
  - `service/` – Forretningslogikk og databaseaksess
  - `model/` – Java-modeller for bruker, kunde, timeføring

### Frontend (Next.js)
- **UI:** Material UI (MUI) for moderne, tilgjengelig design.
- **State management:** React hooks.
- **Funksjonelle komponenter:**
  - **RegisterTimeModal:** Dynamisk skjema for én eller flere timeføringer.
  - **CompanyGrid/CompanyCard:** Oversikt og administrasjon av kunder.
  - **CalendarModal:** Kalender med fargekoder og detaljer for hver registrering.
  - **SummaryModal:** Summering, filtrering og eksport til Excel.
  - **Autentisering:** Egen side for innlogging og registrering.
- **API-håndtering:** Egen `api.js` for all kommunikasjon med backend.
 
 ---

## Eksempel på bruk

- **Registrer timer:**  
  Fyll ut én eller flere rader i skjemaet, velg kunde, kategori, dato og timer. Trykk "Registrer" for å lagre alt på én gang.
- **Kalender:**  
  Se alle registreringer i en oversiktlig kalender. Klikk på en registrering for detaljer.
- **Summering:**  
  Få oversikt over timer per kunde/kategori, filtrer på år/måned, og last ned rapport som Excel.

---

## Teknologier

- **Backend:** Spring Boot 3, Java 21, AstraDB (Cassandra), Maven
- **Frontend:** Next.js 15, React 19, Material UI, ExcelJS (for eksport), JavaScript (ES6+)

---