import React, { useMemo, useState } from 'react';
import { Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem, Grid, Tabs, Tab, Button } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { getMonth, getYear } from '../lib/utils';

const COLORS = ['#1976d2', '#7b1fa2', '#388e3c', '#fbc02d', '#e64a19', '#0288d1', '#c2185b', '#afb42b', '#6d4c41', '#00897b'];

function FilterSelect({ label, value, onChange, options, ...props }) {
  return (
    <FormControl size="small" sx={{ minWidth: 140 }} {...props}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={onChange}>
        <MenuItem value="Alle"><em>Alle</em></MenuItem>
        {options.map(opt => (
          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

const TAB_CONFIG = [
  { label: 'Kunde', value: 'kunde' },
  { label: 'Kategori', value: 'kategori' },
  { label: 'Måned', value: 'maaned' },
];

export default function Dashboard({ entries, companies }) {
  // Filtre
  const [filterCompany, setFilterCompany] = useState('Alle');
  const [filterCategory, setFilterCategory] = useState('Alle');
  const [filterYear, setFilterYear] = useState('Alle');
  const [filterMonth, setFilterMonth] = useState('Alle');
  const [tab, setTab] = useState('kunde');

  // Filtervalg
  const companyOptions = companies.map(c => ({ value: c.id, label: c.name }));
  const categoryOptions = useMemo(() => {
    const cats = [...new Set(entries.map(e => e.category || 'Ukategorisert'))];
    return cats.map(c => ({ value: c, label: c }));
  }, [entries]);
  const yearOptions = useMemo(() => {
    const years = [...new Set(entries.map(e => getYear(e.date)))].sort((a, b) => b - a);
    return years.map(y => ({ value: y, label: y }));
  }, [entries]);
  const monthOptions = useMemo(() => {
    const months = [...new Set(entries
      .filter(e => filterYear === 'Alle' || getYear(e.date) === filterYear)
      .map(e => getMonth(e.date))
    )].sort((a, b) => a - b);
    return months.map(m => ({ value: m, label: new Date(2000, m-1).toLocaleString('nb-NO', { month: 'long' }) }));
  }, [entries, filterYear]);

  // Filtrerte entries
  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      if (filterCompany !== 'Alle' && entry.companyId !== filterCompany) return false;
      if (filterCategory !== 'Alle' && (entry.category || 'Ukategorisert') !== filterCategory) return false;
      if (filterYear !== 'Alle' && getYear(entry.date) !== filterYear) return false;
      if (filterMonth !== 'Alle' && getMonth(entry.date) !== filterMonth) return false;
      return true;
    });
  }, [entries, filterCompany, filterCategory, filterYear, filterMonth]);

  // Data for grafer
  // 1. Timer per kunde
  const dataPerKunde = useMemo(() => {
    const companyMap = Object.fromEntries(companies.map(c => [c.id, c.name]));
    const sum = {};
    filteredEntries.forEach(entry => {
      const name = companyMap[entry.companyId] || entry.companyName || 'Ukjent';
      sum[name] = (sum[name] || 0) + parseFloat(entry.hours);
    });
    return Object.entries(sum).map(([name, hours]) => ({ name, hours: Number(hours.toFixed(2)) }));
  }, [filteredEntries, companies]);

  // 2. Timer per kategori
  const dataPerKategori = useMemo(() => {
    const sum = {};
    filteredEntries.forEach(entry => {
      const cat = entry.category || 'Ukategorisert';
      sum[cat] = (sum[cat] || 0) + parseFloat(entry.hours);
    });
    return Object.entries(sum).map(([name, value]) => ({ name, value: Number(value.toFixed(2)) }));
  }, [filteredEntries]);

  // 3. Timer per måned per kunde
  const dataPerMaanedPerKunde = useMemo(() => {
    // Finn alle måneder som finnes i filtrerte data
    const allMonths = new Set();
    const companyMap = Object.fromEntries(companies.map(c => [c.id, c.name]));
    filteredEntries.forEach(entry => {
      const year = getYear(entry.date);
      const month = getMonth(entry.date);
      allMonths.add(`${year}-${month}`);
    });
    const sortedMonths = Array.from(allMonths).sort((a, b) => a.localeCompare(b));
    // Finn alle relevante kunder
    const relevantCompanies = {};
    filteredEntries.forEach(entry => {
      const id = entry.companyId;
      const name = companyMap[id] || entry.companyName || 'Ukjent';
      relevantCompanies[id] = name;
    });
    // Bygg datastruktur: [{ name: 'jan 2024', [kunde1]: timer, [kunde2]: timer, ... }]
    const rows = sortedMonths.map(key => {
      const [year, month] = key.split('-');
      const row = { name: `${new Date(year, month-1).toLocaleString('nb-NO', { month: 'short' })} ${year}` };
      Object.entries(relevantCompanies).forEach(([id, name]) => {
        row[name] = 0;
      });
      filteredEntries.forEach(entry => {
        const eYear = getYear(entry.date);
        const eMonth = getMonth(entry.date);
        if (`${eYear}-${eMonth}` === key) {
          const name = companyMap[entry.companyId] || entry.companyName || 'Ukjent';
          row[name] = (row[name] || 0) + parseFloat(entry.hours);
        }
      });
      return row;
    });
    return rows;
  }, [filteredEntries, companies]);

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Filtrer</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <FilterSelect label="Kunde" value={filterCompany} onChange={e => setFilterCompany(e.target.value)} options={companyOptions} />
          <FilterSelect label="Kategori" value={filterCategory} onChange={e => setFilterCategory(e.target.value)} options={categoryOptions} />
          <FilterSelect label="År" value={filterYear} onChange={e => setFilterYear(e.target.value)} options={yearOptions} />
          <FilterSelect label="Måned" value={filterMonth} onChange={e => setFilterMonth(e.target.value)} options={monthOptions} disabled={filterYear === 'Alle'} />
          <Button onClick={() => { setFilterCompany('Alle'); setFilterCategory('Alle'); setFilterYear('Alle'); setFilterMonth('Alle'); }} sx={{ height: '40px' }}>Nullstill filtre</Button>
        </Box>
      </Paper>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
          {TAB_CONFIG.map(t => <Tab key={t.value} value={t.value} label={t.label} />)}
        </Tabs>
        <Box sx={{ mt: 3 }}>
          {tab === 'kunde' && (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={dataPerKunde} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Timer', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={v => `${v} timer`} />
                <Legend />
                <Bar dataKey="hours" name="Timer" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          )}
          {tab === 'kategori' && (
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie data={dataPerKategori} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {dataPerKategori.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={v => `${v} timer`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
          {tab === 'maaned' && (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={dataPerMaanedPerKunde} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Timer', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={v => `${v} timer`} />
                <Legend />
                {Object.keys(dataPerMaanedPerKunde[0] || {}).filter(k => k !== 'name').map((kunde, idx) => (
                  <Line key={kunde} type="monotone" dataKey={kunde} name={kunde} stroke={COLORS[idx % COLORS.length]} strokeWidth={3} dot />
                ))}
              </LineChart>
            </ResponsiveContainer>
          )}
        </Box>
      </Paper>
    </Box>
  );
} 