'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import CompanyGrid from '../components/CompanyGrid';
import AddCompanyModal from '../components/AddCompanyModal';
import SearchBar from '../components/SearchBar';
import RegisterTimeModal from '../components/RegisterTimeModal';
import CompanyTimeModal from '../components/CompanyTimeModal';
import CalendarModal from '../components/CalendarModal';
import SummaryModal from '../components/SummaryModal';

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCompany, setNewCompany] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerValues, setRegisterValues] = useState({
    companyId: '',
    description: '',
    hours: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [loading, setLoading] = useState(false);

  // Ny state for selskapstimer
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyTimeEntries, setCompanyTimeEntries] = useState([]);
  const [companyTimeLoading, setCompanyTimeLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Ny state for kalender
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarEntries, setCalendarEntries] = useState([]);
  const [calendarLoading, setCalendarLoading] = useState(false);
  const today = new Date();
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth());
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());

  // Ny state for summering
  const [showSummary, setShowSummary] = useState(false);
  const [summaryEntries, setSummaryEntries] = useState([]);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const summaryYear = today.getFullYear();
  const summaryMonth = today.getMonth() + 1;
  const summaryWeek = (() => {
    const d = new Date(today);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  })();

  // Hent alle selskaper
  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://regtimeapp.ashysmoke-badd1035.northeurope.azurecontainerapps.io/api/companies');
      if (res.ok) {
        const data = await res.json();
        setCompanies(data);
      }
    } catch (e) {
      // Håndter evt. feil
    } finally {
      setLoading(false);
    }
  };

  // Opprett nytt selskap
  const createCompany = async (e) => {
    e.preventDefault();
    if (!newCompany.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('https://regtimeapp.ashysmoke-badd1035.northeurope.azurecontainerapps.io/api/companies', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCompany.trim() }),
      });
      if (res.ok) {
        setNewCompany("");
        setShowModal(false);
        fetchCompanies();
      }
    } catch (e) {
      // Håndter evt. feil
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterChange = (field, value) => {
    setRegisterValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    setRegisterError('');
    const company = companies.find((c) => c.id === registerValues.companyId);
    if (!company) {
      setRegisterError('Velg et selskap');
      setRegisterLoading(false);
      return;
    }
    try {
      const response = await fetch('https://regtimeapp.ashysmoke-badd1035.northeurope.azurecontainerapps.io/api/timer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...registerValues,
          companyName: company.name,
        }),
      });
      if (response.ok) {
        setShowRegisterModal(false);
        setRegisterValues({
          companyId: '',
          description: '',
          hours: '',
          date: new Date().toISOString().split('T')[0],
        });
      } else {
        setRegisterError('Feil ved registrering av timeføring');
      }
    } catch (error) {
      setRegisterError('Kunne ikke koble til serveren');
    } finally {
      setRegisterLoading(false);
    }
  };

  // Hent timer for valgt selskap og åpne modal
  const handleCompanyClick = async (company) => {
    setSelectedCompany(company);
    setCompanyTimeLoading(true);
    setCompanyTimeEntries([]);
    try {
      const res = await fetch(`https://regtimeapp.ashysmoke-badd1035.northeurope.azurecontainerapps.io/api/timer/selskap/${company.id}`);
      if (res.ok) {
        const data = await res.json();
        setCompanyTimeEntries(data);
      } else {
        setCompanyTimeEntries([]);
      }
    } catch (e) {
      setCompanyTimeEntries([]);
    } finally {
      setCompanyTimeLoading(false);
    }
  };

  // Håndter sletting av time entry
  const handleTimeEntryDeleted = (deletedId) => {
    setCompanyTimeEntries(prev => prev.filter(entry => entry.id !== deletedId));
  };

  const handleOpenCalendar = async () => {
    setShowCalendar(true);
    setCalendarLoading(true);
    try {
      const res = await fetch('https://regtimeapp.ashysmoke-badd1035.northeurope.azurecontainerapps.io/api/timer');
      if (res.ok) {
        const data = await res.json();
        setCalendarEntries(data);
      } else {
        setCalendarEntries([]);
      }
    } catch (e) {
      setCalendarEntries([]);
    } finally {
      setCalendarLoading(false);
    }
  };

  const handleOpenSummary = async () => {
    setShowSummary(true);
    setSummaryLoading(true);
    try {
      const res = await fetch('https://regtimeapp.ashysmoke-badd1035.northeurope.azurecontainerapps.io/api/timer');
      if (res.ok) {
        const data = await res.json();
        setSummaryEntries(data);
      } else {
        setSummaryEntries([]);
      }
    } catch (e) {
      setSummaryEntries([]);
    } finally {
      setSummaryLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Filtrer selskaper basert på søk
  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Header
          onOversikt={() => {}}
          onRegistrere={() => setShowRegisterModal(true)}
          onKalender={handleOpenCalendar}
          onSummering={handleOpenSummary}
          onAddCompany={() => setShowModal(true)}
        />
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <SearchBar onSearch={setSearchTerm} placeholder="Søk nummer eller navn på selskap" />
          </div>
        </div>
        <CompanyGrid companies={filteredCompanies} onCompanyClick={handleCompanyClick} loading={loading} />
        <AddCompanyModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={createCompany}
          value={newCompany}
          onChange={e => setNewCompany(e.target.value)}
          loading={loading}
        />
        <RegisterTimeModal
          open={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
          onSubmit={handleRegisterSubmit}
          companies={companies}
          values={registerValues}
          onChange={handleRegisterChange}
          loading={registerLoading}
          error={registerError}
        />
        <CompanyTimeModal
          open={!!selectedCompany}
          onClose={() => setSelectedCompany(null)}
          company={selectedCompany}
          timeEntries={companyTimeEntries}
          loading={companyTimeLoading}
          onTimeEntryDeleted={handleTimeEntryDeleted}
        />
        <CalendarModal
          open={showCalendar}
          onClose={() => setShowCalendar(false)}
          timeEntries={calendarEntries}
          month={calendarMonth}
          year={calendarYear}
        />
        <SummaryModal
          open={showSummary}
          onClose={() => setShowSummary(false)}
          companies={companies}
          timeEntries={summaryEntries}
          year={summaryYear}
          month={summaryMonth}
          week={summaryWeek}
        />
      </div>
    </div>
  );
}
