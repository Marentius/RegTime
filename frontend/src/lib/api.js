const API_BASE_URL = 'https://175c4db0-bc5d-4e1b-8ddb-05e81448a6f6-eu-west-1.apps.astra.datastax.com/api/rest/v2/namespaces/timeks';

// Generell funksjon for å håndtere fetch-kall
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const userId = typeof window !== "undefined" ? localStorage.getItem('userId') : null;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(userId ? { 'X-USER-ID': userId } : {}),
      ...options.headers
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      // Prøver å parse feilmelding fra body, ellers bruk statusText
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: response.statusText };
      }
      throw new Error(errorData.message || 'En ukjent feil oppstod');
    }
    // Returner ingenting hvis det er en 204 No Content eller et DELETE-kall.
    if (response.status === 204 || options.method === 'DELETE') {
      return;
    }
    return response.json();
  } catch (error) {
    console.error(`API call failed: ${error.message}`);
    throw error; // Kast feilen videre slik at den kan håndteres i komponenten
  }
}

// Selskaper
export const getCompanies = () => request('/companies');
export const createCompany = (companyData) => request('/companies', {
  method: 'POST',
  body: JSON.stringify(companyData),
});
export const deleteCompany = (id) => request(`/companies/${id}`, {
  method: 'DELETE',
});

// Autentisering
export const login = ({ username, password }) => request('/auth/login', {
  method: 'POST',
  body: JSON.stringify({ username, password }),
});

export const register = ({ username, password }) => request('/auth/register', {
  method: 'POST',
  body: JSON.stringify({ username, password }),
});

// Timer
export const getTimeEntries = () => request('/timer');
export const getCategories = () => request('/timer/categories');
export const createTimeEntry = (timeEntryData) => request('/timer', {
  method: 'POST',
  body: JSON.stringify(timeEntryData),
});
export const deleteTimeEntry = (id) => request(`/timer/${id}`, {
  method: 'DELETE',
}); 