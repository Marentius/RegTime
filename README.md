# RegTime - Timeføring System

Dette er et enkelt timeføringssystem med Spring Boot backend og Next.js frontend.

## Backend (Spring Boot)

Backend bruker AstraDB (Cassandra) for datalagring og tilbyr følgende API-endepunkter:

- `POST /api/timer` - Opprett ny timeføring
- `GET /api/timer` - Hent alle timeføringer
- `GET /api/timer/kunde/{name}` - Hent timeføringer for spesifikk kunde

### Kjøre backend

```bash
cd backend
./mvnw spring-boot:run
```

Backend kjører på `http://localhost:8080`

## Frontend (Next.js)

Enkel React-frontend for testing av backend API-et.

### Kjøre frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend kjører på `http://localhost:3000`

## Testing

1. Start backend først
2. Start frontend
3. Åpne `http://localhost:3000` i nettleseren
4. Test funksjonene:
   - Opprett ny timeføring
   - Se alle timeføringer
   - Søk etter spesifikk kunde

## Funksjoner

- ✅ Opprett timeføringer med kunde, beskrivelse, timer og dato
- ✅ Vis alle timeføringer
- ✅ Søk etter kunde
- ✅ Responsivt design med Tailwind CSS
- ✅ CORS-konfigurasjon for lokal testing

## Teknisk Stack

**Backend:**
- Spring Boot 3.5.3
- Java 21
- AstraDB (Cassandra) for datalagring
- Maven

**Frontend:**
- Next.js 15.3.4
- React 19
- Tailwind CSS 4
- JavaScript (ES6+) 