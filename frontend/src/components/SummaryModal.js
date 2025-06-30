import React, { useState, useMemo } from 'react';
import { getMonth, getYear } from '../lib/utils';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Box, Typography, Accordion, AccordionSummary, AccordionDetails,
  FormControl, InputLabel, Select, MenuItem, Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FilterSelect = ({ label, value, onChange, options, ...props }) => (
  <FormControl size="small" {...props}>
    <InputLabel>{label}</InputLabel>
    <Select value={value} label={label} onChange={onChange}>
      <MenuItem value="Alle"><em>Alle</em></MenuItem>
      {options.map(opt => (
        <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default function SummaryModal({ open, onClose, entries, companies }) {
  const [filterCompany, setFilterCompany] = useState('Alle');
  const [filterYear, setFilterYear] = useState('Alle');
  const [filterMonth, setFilterMonth] = useState('Alle');

  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      if (filterCompany !== 'Alle' && entry.companyId !== filterCompany) return false;
      if (filterYear !== 'Alle' && getYear(entry.date) !== filterYear) return false;
      if (filterMonth !== 'Alle' && getMonth(entry.date) !== filterMonth) return false;
      return true;
    });
  }, [entries, filterCompany, filterYear, filterMonth]);
  
  const summary = useMemo(() => {
    return filteredEntries.reduce((acc, entry) => {
      const company = entry.companyName;
      if (!acc[company]) {
        acc[company] = { totalHours: 0, categories: {} };
      }
      acc[company].totalHours += parseFloat(entry.hours);

      const category = entry.category || 'Ukategorisert';
      if (!acc[company].categories[category]) {
        acc[company].categories[category] = 0;
      }
      acc[company].categories[category] += parseFloat(entry.hours);
      return acc;
    }, {});
  }, [filteredEntries]);

  const availableYears = useMemo(() => [...new Set(entries.map(e => getYear(e.date)))].sort((a,b) => b-a).map(y => ({ value: y, label: y })), [entries]);
  const availableMonths = useMemo(() => [...new Set(entries.filter(e => filterYear === 'Alle' || getYear(e.date) === filterYear).map(e => getMonth(e.date)))].sort((a,b) => a-b).map(m => ({ value: m, label: new Date(filterYear, m-1).toLocaleString('nb-NO', { month: 'long' }) })), [entries, filterYear]);
  const companyOptions = companies.map(c => ({ value: c.id, label: c.name }));

  const handleResetFilters = () => {
    setFilterCompany('Alle');
    setFilterYear('Alle');
    setFilterMonth('Alle');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Summering og Rapport</DialogTitle>
      <DialogContent>
        <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Filter</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <FilterSelect label="Selskap" value={filterCompany} onChange={(e) => setFilterCompany(e.target.value)} options={companyOptions} sx={{ minWidth: 150, flexGrow: 1 }} />
            <FilterSelect label="År" value={filterYear} onChange={(e) => setFilterYear(e.target.value)} options={availableYears} sx={{ minWidth: 120 }}/>
            <FilterSelect label="Måned" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)} options={availableMonths} sx={{ minWidth: 140 }} disabled={filterYear === 'Alle'}/>
            <Button onClick={handleResetFilters} sx={{ height: '40px' }}>Nullstill</Button>
          </Box>
        </Paper>

        {Object.keys(summary).length > 0 ? (
          Object.entries(summary).map(([company, data]) => (
            <Accordion key={company} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pr: 1 }}>
                  <Typography variant="h6">{company}</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Totalt: {data.totalHours.toFixed(2)} timer
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  {Object.entries(data.categories)
                    .sort(([, aHours], [, bHours]) => bHours - aHours)
                    .map(([category, hours]) => (
                      <Paper key={category} variant="outlined" sx={{ p: 1.5, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>{category}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>{hours.toFixed(2)} timer</Typography>
                      </Paper>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography sx={{ mt: 4, textAlign: 'center' }}>Ingen data å summere for valgt periode.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Lukk</Button>
      </DialogActions>
    </Dialog>
  );
}