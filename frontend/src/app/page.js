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
import * as api from '../lib/api';

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [timeEntries, setTimeEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [newCompany, setNewCompany] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerValues, setRegisterValues] = useState({
    companyId: '',
    description: '',
    hours: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // State for kalender-måned og år
  const [calendarDate, setCalendarDate] = useState(new Date());

  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [companiesData, timeEntriesData] = await Promise.all([
        api.getCompanies(),
        api.getTimeEntries()
      ]);
      setCompanies(companiesData);
      setTimeEntries(timeEntriesData);
    } catch (e) {
      console.error("Failed to fetch data", e);
    } finally {
      setLoading(false);
    }
  };

  const createCompany = async (e) => {
    e.preventDefault();
    if (!newCompany.trim()) return;
    setLoading(true);
    try {
      await api.createCompany({ name: newCompany.trim() });
      setNewCompany("");
      setShowModal(false);
      fetchData();
    } catch (e) {
      console.error("Failed to create company", e);
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
      await api.createTimeEntry({
        ...registerValues,
        companyName: company.name,
      });
      setShowRegisterModal(false);
      setRegisterValues({
        companyId: '',
        description: '',
        hours: '',
        date: new Date().toISOString().split('T')[0],
      });
      fetchData();
    } catch (error) {
      setRegisterError(error.message || 'Kunne ikke koble til serveren');
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  const handleTimeEntryDeleted = () => {
    fetchData();
    setSelectedCompany(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Header
          onOversikt={() => {}}
          onRegistrere={() => setShowRegisterModal(true)}
          onKalender={() => setShowCalendar(true)}
          onSummering={() => setShowSummary(true)}
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
          timeEntries={timeEntries}
          loading={loading}
          onTimeEntryDeleted={handleTimeEntryDeleted}
        />
        <CalendarModal
          open={showCalendar}
          onClose={() => setShowCalendar(false)}
          timeEntries={timeEntries}
          loading={loading}
          currentDate={calendarDate}
          onDateChange={setCalendarDate}
        />
        <SummaryModal
          open={showSummary}
          onClose={() => setShowSummary(false)}
          companies={companies}
          timeEntries={timeEntries}
          loading={loading}
        />
      </div>
    </div>
  );
}
