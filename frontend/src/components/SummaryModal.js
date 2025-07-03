import React, { useState, useMemo } from 'react';
import { getMonth, getYear } from '../lib/utils';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Box, Typography, Accordion, AccordionSummary, AccordionDetails,
  FormControl, InputLabel, Select, MenuItem, Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExcelJS from 'exceljs';

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
  const [filterCategory, setFilterCategory] = useState('Alle');

  const availableCategories = useMemo(() => {
    const cats = [...new Set(entries.map(e => e.category || 'Ukategorisert'))];
    return cats.map(c => ({ value: c, label: c }));
  }, [entries]);

  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      if (filterCompany !== 'Alle' && entry.companyId !== filterCompany) return false;
      if (filterYear !== 'Alle' && getYear(entry.date) !== filterYear) return false;
      if (filterMonth !== 'Alle' && getMonth(entry.date) !== filterMonth) return false;
      if (filterCategory !== 'Alle' && (entry.category || 'Ukategorisert') !== filterCategory) return false;
      return true;
    });
  }, [entries, filterCompany, filterYear, filterMonth, filterCategory]);
  
  const summary = useMemo(() => {
    return filteredEntries.reduce((acc, entry) => {
      const company = entry.companyName;
      if (!acc[company]) {
        acc[company] = { totalHours: 0, categories: {} };
      }
      acc[company].totalHours += parseFloat(entry.hours);

      const category = entry.category || 'Ukategorisert';
      if (!acc[company].categories[category]) {
        acc[company].categories[category] = { totalHours: 0, descriptions: {} };
      }
      acc[company].categories[category].totalHours += parseFloat(entry.hours);

      const description = entry.description || 'Ingen beskrivelse';
      if (!acc[company].categories[category].descriptions[description]) {
        acc[company].categories[category].descriptions[description] = 0;
      }
      acc[company].categories[category].descriptions[description] += parseFloat(entry.hours);
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
    setFilterCategory('Alle');
  };

  const handleDownloadExcel = async () => {
    // Lag en flat array med alle summerte rader
    const rows = [];
    Object.entries(summary).forEach(([company, data]) => {
      Object.entries(data.categories).forEach(([category, catData]) => {
        Object.entries(catData.descriptions).forEach(([description, hours]) => {
          rows.push({
            Firma: company,
            Kategori: category,
            Beskrivelse: description,
            Timer: hours.toFixed(2),
            År: filterYear === 'Alle' ? '' : filterYear,
            Måned: filterMonth === 'Alle' ? '' : (filterMonth ? new Date(filterYear, filterMonth-1).toLocaleString('nb-NO', { month: 'long' }) : ''),
          });
        });
      });
    });
    if (rows.length === 0) return;
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Summering');
    worksheet.columns = [
      { header: 'Firma', key: 'Firma', width: 30 },
      { header: 'Kategori', key: 'Kategori', width: 20 },
      { header: 'Beskrivelse', key: 'Beskrivelse', width: 40 },
      { header: 'Timer', key: 'Timer', width: 12 },
      { header: 'År', key: 'År', width: 10 },
      { header: 'Måned', key: 'Måned', width: 15 },
    ];
    rows.forEach(row => worksheet.addRow(row));
    // Lagre filen i browser
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'regtime_summering.xlsx';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Summering og Rapport</DialogTitle>
      <DialogContent>
        <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Filter</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <FilterSelect label="Kunde" value={filterCompany} onChange={(e) => setFilterCompany(e.target.value)} options={companyOptions} sx={{ minWidth: 150, flexGrow: 1 }} />
            <FilterSelect label="År" value={filterYear} onChange={(e) => setFilterYear(e.target.value)} options={availableYears} sx={{ minWidth: 120 }}/>
            <FilterSelect label="Måned" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)} options={availableMonths} sx={{ minWidth: 140 }} disabled={filterYear === 'Alle'}/>
            <FilterSelect label="Kategori" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} options={availableCategories} sx={{ minWidth: 140 }}/>
            <Button onClick={handleResetFilters} sx={{ height: '40px' }}>Nullstill</Button>
            <Button onClick={handleDownloadExcel} sx={{ height: '40px' }} variant="contained" color="success">Last ned Excel</Button>
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
                    .sort(([, aData], [, bData]) => bData.totalHours - aData.totalHours)
                    .map(([category, catData]) => (
                      <Paper key={category} variant="outlined" sx={{ p: 1.5, mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>{category} ({catData.totalHours.toFixed(2)} t)</Typography>
                        {Object.entries(catData.descriptions)
                          .sort(([, aHours], [, bHours]) => bHours - aHours)
                          .map(([description, hours]) => (
                            <Box key={description} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                              <Typography sx={{ color: 'text.secondary' }}>{description}</Typography>
                              <Typography sx={{ fontWeight: 'bold' }}>{hours.toFixed(2)} timer</Typography>
                            </Box>
                        ))}
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