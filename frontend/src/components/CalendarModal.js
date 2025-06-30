import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Typography, Chip, Box } from '@mui/material';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { parse, startOfWeek, getDay, format } from 'date-fns';
import nb from 'date-fns/locale/nb';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTheme } from '@mui/material/styles';

const locales = {
  'nb': nb,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const categoryColors = {
  'Ferie': '#e57373',
  'HubSpot': '#81c784',
  'Jobb': '#7986cb',
  'Ukategorisert': '#bdbdbd',
};

function getCategoryColor(category) {
  return categoryColors[category] || '#bdbdbd';
}

export default function CalendarModal({ open, onClose, entries, currentDate, onDateChange, categories }) {
  const theme = useTheme();
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Legg til custom CSS for å style react-big-calendar mørkt
    const style = document.createElement('style');
    style.innerHTML = `
      .rbc-calendar, .rbc-month-view, .rbc-header, .rbc-month-row, .rbc-date-cell, .rbc-day-bg, .rbc-off-range-bg {
        background: ${theme.palette.background.default} !important;
        color: ${theme.palette.text.primary} !important;
        border-color: ${theme.palette.divider} !important;
      }
      .rbc-header {
        background: ${theme.palette.background.paper} !important;
        color: ${theme.palette.text.primary} !important;
        font-weight: 700;
        border-bottom: 1px solid ${theme.palette.divider} !important;
      }
      .rbc-today {
        background: ${theme.palette.action.selected} !important;
      }
      .rbc-event {
        box-shadow: none !important;
        border-radius: 6px !important;
        font-weight: 700;
        font-size: 1rem;
        opacity: 0.95;
      }
      .rbc-toolbar {
        background: transparent !important;
        color: ${theme.palette.text.primary} !important;
        margin-bottom: 1rem;
      }
      .rbc-toolbar button {
        background: ${theme.palette.background.paper} !important;
        color: ${theme.palette.primary.main} !important;
        border: none !important;
        border-radius: 4px !important;
        margin: 0 2px;
        font-weight: 600;
        transition: background 0.2s;
      }
      .rbc-toolbar button.rbc-active {
        background: ${theme.palette.primary.main} !important;
        color: ${theme.palette.primary.contrastText} !important;
      }
      .rbc-off-range-bg {
        background: ${theme.palette.background.default} !important;
        opacity: 0.5;
      }
      .rbc-month-row {
        border-bottom: 1px solid ${theme.palette.divider} !important;
      }
      .rbc-date-cell {
        color: ${theme.palette.text.secondary} !important;
        font-weight: 500;
      }
      .rbc-date-cell.rbc-now {
        color: ${theme.palette.primary.main} !important;
        font-weight: 700;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, [theme]);

  if (!open) return null;

  // Map entries til events for kalenderen
  const events = entries.map(entry => {
    const start = new Date(entry.date);
    const end = new Date(entry.date);
    return {
      id: entry.id,
      title: `${entry.hours}t - ${entry.companyName}${entry.category ? ' (' + entry.category + ')' : ''}`,
      start,
      end,
      allDay: true,
      resource: entry,
    };
  });

  // Håndter månedsskifte
  const handleNavigate = (date) => {
    onDateChange(date);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Kalender</DialogTitle>
      <DialogContent>
        <div style={{ height: 600 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            view="month"
            defaultView="month"
            date={currentDate}
            onNavigate={handleNavigate}
            style={{ height: 600 }}
            eventPropGetter={event => ({
              style: {
                backgroundColor: getCategoryColor(event.resource.category),
                color: '#fff',
                borderRadius: '6px',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                padding: '2px 6px',
              }
            })}
            messages={{
              next: 'Neste',
              previous: 'Forrige',
              today: 'I dag',
              month: 'Måned',
              week: '',
              day: '',
              agenda: '',
              date: 'Dato',
              time: 'Tid',
              event: 'Hendelse',
              showMore: total => `+${total} mer`,
            }}
            toolbar={true}
            popup
            views={['month']}
            onSelectEvent={event => setSelectedEvent(event)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Lukk</Button>
      </DialogActions>

      {/* Modal for detaljert info om valgt registrering */}
      <Dialog open={!!selectedEvent} onClose={() => setSelectedEvent(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Registreringsdetaljer</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="subtitle1" fontWeight={700}>
                {selectedEvent.title}
              </Typography>
              <Typography variant="body2">
                <b>Dato:</b> {selectedEvent.start.toLocaleDateString('nb-NO')}
              </Typography>
              <Typography variant="body2">
                <b>Timer:</b> {selectedEvent.resource.hours}
              </Typography>
              <Typography variant="body2">
                <b>Firma:</b> {selectedEvent.resource.companyName}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" component="span">
                  <b>Kategori:</b>
                </Typography>
                <Chip label={selectedEvent.resource.category || 'Ukategorisert'} size="small" style={{ background: getCategoryColor(selectedEvent.resource.category), color: '#fff' }} />
              </Box>
              <Typography variant="body2" sx={{ maxHeight: 120, overflowY: 'auto', whiteSpace: 'pre-line' }}>
                <b>Kommentar:</b> {selectedEvent.resource.description || 'Ingen kommentar'}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedEvent(null)}>Lukk</Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
} 