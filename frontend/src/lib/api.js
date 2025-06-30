const API_BASE_URL = 'https://regtimeapp.ashysmoke-badd1035.northeurope.azurecontainerapps.io/api';

// Generell funksjon for å håndtere fetch-kall
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: { 'Content-Type': 'application/json', ...options.headers },
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
    // Returner ingenting hvis det er en 204 No Content respons (f.eks. ved DELETE)
    if (response.status === 204) {
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

// Timer
export const getTimeEntries = () => request('/timer');
export const createTimeEntry = (timeEntryData) => request('/timer', {
  method: 'POST',
  body: JSON.stringify(timeEntryData),
});
export const deleteTimeEntry = (id) => request(`/timer/${id}`, {
  method: 'DELETE',
}); 