import React from 'react';
import { getDaysInMonth, getFirstDayOfWeek } from '../lib/utils';
import {
  Dialog, DialogContent, DialogTitle, DialogActions, Button,
  Box, IconButton, Typography, Grid, Paper, Chip
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const categoryColors = {};
const availableColors = ['primary', 'secondary', 'success', 'error', 'warning', 'info'];

const getCategoryColor = (category) => {
  if (!category) return 'default';
  if (!categoryColors[category]) {
    categoryColors[category] = availableColors[Object.keys(categoryColors).length % availableColors.length];
  }
  return categoryColors[category];
};

export default function CalendarModal({ open, onClose, entries, currentDate, onDateChange, categories }) {
  if (!open) return null;

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const daysInMonth = getDaysInMonth(month, year);
  const firstDayOfWeek = getFirstDayOfWeek(month, year);

  const entriesByDate = entries.reduce((acc, entry) => {
    const date = entry.date.split('T')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {});

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return { day, dateStr, entries: entriesByDate[dateStr] || [] };
  });

  const blanks = Array(firstDayOfWeek).fill(null);
  const calendarCells = [...blanks, ...days];

  const handlePrevMonth = () => onDateChange(new Date(year, month - 1, 1));
  const handleNextMonth = () => onDateChange(new Date(year, month + 1, 1));

  const today = new Date();
  const isToday = (day) => year === today.getFullYear() && month === today.getMonth() && day === today.getDate();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div">Kalender</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handlePrevMonth}><ChevronLeft /></IconButton>
          <Typography variant="h6" component="div" sx={{ width: '150px', textAlign: 'center' }}>
            {currentDate.toLocaleString('nb-NO', { month: 'long', year: 'numeric' })}
          </Typography>
          <IconButton onClick={handleNextMonth}><ChevronRight /></IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Grid container columns={7} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"].map(d => (
            <Grid item xs={1} key={d} sx={{ p: 1, textAlign: 'center', fontWeight: 'bold' }}>
              {d}
            </Grid>
          ))}
        </Grid>
        <Grid container columns={7} sx={{ flexGrow: 1 }}>
          {calendarCells.map((cell, idx) => (
            <Grid item xs={1} key={idx} sx={{ borderRight: 1, borderBottom: 1, borderColor: 'divider', p: 0.5, display: 'flex', flexDirection: 'column', minHeight: '120px' }}>
              {cell && (
                <>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 'bold',
                      alignSelf: 'flex-start',
                      ...(isToday(cell.day) && {
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        borderRadius: '50%',
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      })
                    }}
                  >
                    {cell.day}
                  </Typography>
                  <Box sx={{ overflowY: 'auto', mt: 0.5, flexGrow: 1, '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'divider', borderRadius: '2px' } }}>
                    {cell.entries.map(entry => (
                       <Paper
                         key={entry.id}
                         elevation={0}
                         sx={{
                           p: 0.5,
                           mb: 0.5,
                           backgroundColor: 'background.default',
                           borderLeft: 3,
                           borderColor: `${getCategoryColor(entry.category)}.main`
                         }}
                         title={`${entry.companyName}: ${entry.description}`}
                       >
                         <Typography variant="caption" display="block" sx={{ fontWeight: 'bold' }}>
                           {entry.hours}t - {entry.companyName}
                         </Typography>
                       </Paper>
                    ))}
                  </Box>
                </>
              )}
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="subtitle2" gutterBottom>Tegnforklaring</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {categories.map(cat => (
                    <Chip key={cat} label={cat} size="small" variant="outlined" color={getCategoryColor(cat)} />
                ))}
                <Chip label="Ukategorisert" size="small" variant="outlined" color="default" />
            </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Lukk</Button>
      </DialogActions>
    </Dialog>
  );
} 