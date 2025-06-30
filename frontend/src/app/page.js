'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as api from '../lib/api';
import { Container, Grid, Button, Box, Typography, CircularProgress, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import CompanyCard from '@/components/CompanyCard';
import AddCompanyModal from '@/components/AddCompanyModal';
import ConfirmationModal from '@/components/ConfirmationModal';
import RegisterTimeModal from '@/components/RegisterTimeModal';
import AddCategoryModal from '@/components/AddCategoryModal';
import CalendarModal from '@/components/CalendarModal';
import SummaryModal from '@/components/SummaryModal';
import CompanyTimeModal from '@/components/CompanyTimeModal';

export default function Home() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [companies, setCompanies] = useState([]);
  const [allTimeEntries, setAllTimeEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Modals
  const [isAddCompanyModalOpen, setAddCompanyModalOpen] = useState(false);
  const [isRegisterTimeModalOpen, setRegisterTimeModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isCalendarModalOpen, setCalendarModalOpen] = useState(false);
  const [isSummaryModalOpen, setSummaryModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [calendarDate, setCalendarDate] = useState(new Date());

  // Modal state
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [timeEntryValues, setTimeEntryValues] = useState({
    companyId: '',
    description: '',
    hours: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
  });
  const [timeEntryError, setTimeEntryError] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [companiesData, entriesData, categoriesData] = await Promise.all([
          api.getCompanies(),
          api.getTimeEntries(),
          api.getCategories(),
        ]);
        setCompanies(companiesData);
        setAllTimeEntries(entriesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleAddCompany = async (e) => {
    e.preventDefault();
    setModalLoading(true);
    try {
      const newCompany = await api.createCompany({ name: newCompanyName });
      setCompanies([...companies, newCompany]);
      setAddCompanyModalOpen(false);
      setNewCompanyName('');
    } catch (error) {
      console.error('Failed to add company:', error);
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteConfirmation = (company) => {
    setCompanyToDelete(company);
    setConfirmationModalOpen(true);
  };

  const handleDeleteCompany = async () => {
    if (!companyToDelete) return;
    setModalLoading(true);
    try {
      await api.deleteCompany(companyToDelete.id);
      setCompanies(companies.filter((c) => c.id !== companyToDelete.id));
      setConfirmationModalOpen(false);
      setCompanyToDelete(null);
    } catch (error) {
      console.error('Failed to delete company:', error);
    } finally {
      setModalLoading(false);
    }
  };

  const handleRegisterTime = async (e) => {
    e.preventDefault();
    setModalLoading(true);
    setTimeEntryError('');
    try {
      const company = companies.find(c => c.id === timeEntryValues.companyId);
      const entryToSave = {
        ...timeEntryValues,
        hours: parseFloat(timeEntryValues.hours),
        companyName: company ? company.name : '',
      };
      await api.createTimeEntry(entryToSave);
      setRegisterTimeModalOpen(false);
      const updatedEntries = await api.getTimeEntries();
      setAllTimeEntries(updatedEntries);
    } catch (error) {
      setTimeEntryError(error.message || 'En feil oppstod ved lagring.');
    } finally {
      setModalLoading(false);
    }
  };

  const handleAddTimeCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    const trimmedCategory = newCategoryName.trim();
    if (!categories.includes(trimmedCategory)) {
      setCategories(prev => [...prev, trimmedCategory].sort());
    }
    
    setTimeEntryValues(prev => ({ ...prev, category: trimmedCategory }));
    
    setAddCategoryModalOpen(false);
    setNewCategoryName('');
  };

  const handleDeleteTimeEntry = async (entryId) => {
    const originalEntries = [...allTimeEntries];
    setAllTimeEntries(prevEntries => prevEntries.filter(entry => entry.id !== entryId));
    try {
      await api.deleteTimeEntry(entryId);
    } catch (error) {
      console.error('Failed to delete time entry:', error);
      setAllTimeEntries(originalEntries);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, px: { xs: 1, sm: 2, md: 4 } }}>
      <Header
        onRegistrere={() => setRegisterTimeModalOpen(true)}
        onKalender={() => setCalendarModalOpen(true)}
        onSummering={() => setSummaryModalOpen(true)}
      />

      <main>
        <Box sx={{ my: { xs: 3, md: 6 }, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.2rem' } }}>
                Selskaper
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: { xs: '1rem', md: '1.2rem' } }}>
                Velg et selskap for å se detaljer eller opprett et nytt.
            </Typography>
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          mb: 3,
          gap: 2,
          px: { xs: 0, md: 4 }
        }}>
          <SearchBar
            onSearch={setSearchTerm}
            placeholder="Søk etter selskap..."
          />
          {isMobile && (
            <Button
              variant="contained"
              onClick={() => setRegisterTimeModalOpen(true)}
              sx={{ mt: 1, width: '100%' }}
            >
              Registrer ny tid
            </Button>
          )}
          <Button
            variant="contained"
            onClick={() => setAddCompanyModalOpen(true)}
            sx={{
              ml: { xs: 0, sm: 2 },
              mt: { xs: 1, sm: 0 },
              width: { xs: '100%', sm: 'auto' },
              whiteSpace: 'nowrap',
              fontSize: { xs: '1rem', md: '1rem' },
              px: { xs: 2.5, md: 4 },
              py: { xs: 1.2, md: 1.7 },
            }}
          >
            Legg til selskap
          </Button>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: { xs: 2, md: 4 },
            mt: 1,
            px: { xs: 0, md: 2 },
            width: '100%',
            justifyItems: 'stretch',
            alignItems: 'stretch',
          }}
        >
          {filteredCompanies.map((company) => (
            <Box key={company.id} sx={{ height: '100%', display: 'flex' }}>
              <CompanyCard
                name={company.name}
                onClick={() => setSelectedCompany(company)}
                onDelete={() => handleDeleteConfirmation(company)}
              />
            </Box>
          ))}
        </Box>
      </main>

      <AddCompanyModal
        open={isAddCompanyModalOpen}
        onClose={() => setAddCompanyModalOpen(false)}
        onSubmit={handleAddCompany}
        value={newCompanyName}
        onChange={(e) => setNewCompanyName(e.target.value)}
        loading={modalLoading}
      />

      <ConfirmationModal
        open={isConfirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        onConfirm={handleDeleteCompany}
        title="Bekreft sletting"
        message={`Er du sikker på at du vil slette ${companyToDelete?.name}? Denne handlingen kan ikke angres.`}
        loading={modalLoading}
      />

      <RegisterTimeModal
        open={isRegisterTimeModalOpen}
        onClose={() => setRegisterTimeModalOpen(false)}
        onSubmit={handleRegisterTime}
        companies={companies}
        values={timeEntryValues}
        onChange={(field, value) => setTimeEntryValues(prev => ({ ...prev, [field]: value }))}
        loading={modalLoading}
        error={timeEntryError}
        categories={categories}
        onAddCategory={() => setAddCategoryModalOpen(true)}
        onAddCompany={() => setAddCompanyModalOpen(true)}
      />

      <AddCategoryModal
        open={isAddCategoryModalOpen}
        onClose={() => setAddCategoryModalOpen(false)}
        onSubmit={handleAddTimeCategory}
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        loading={modalLoading}
      />

      <CalendarModal
        open={isCalendarModalOpen}
        onClose={() => setCalendarModalOpen(false)}
        entries={allTimeEntries}
        currentDate={calendarDate}
        onDateChange={setCalendarDate}
        categories={categories}
      />

      <SummaryModal
        open={isSummaryModalOpen}
        onClose={() => setSummaryModalOpen(false)}
        entries={allTimeEntries}
        companies={companies}
      />

      <CompanyTimeModal
        open={!!selectedCompany}
        onClose={() => setSelectedCompany(null)}
        company={selectedCompany}
        entries={allTimeEntries.filter(e => e.companyId === selectedCompany?.id)}
        onDelete={handleDeleteTimeEntry}
      />
      <Box component="footer" sx={{
      width: '100%',
      mt: 6,
      py: 3,
      textAlign: 'center',
      color: 'text.secondary',
      fontSize: { xs: '0.95rem', md: '1rem' },
      letterSpacing: 0.2,
      background: 'transparent',
      position: 'relative',
    }}>
      <Typography variant="body2">
        Laget av Vetle Marentius &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
    </Container>
    
  );
}