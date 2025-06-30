import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel, Box, IconButton, Alert } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function RegisterTimeModal({ open, onClose, onSubmit, companies, values, onChange, loading, error, categories, onAddCategory, onAddCompany }) {
  // Dynamisk liste av registreringer
  const [registreringer, setRegistreringer] = useState([
    values || { companyId: '', description: '', category: '', hours: '', date: '' }
  ]);

  // Oppdater én rad
  const handleChange = (index, field, value) => {
    setRegistreringer(prev => prev.map((r, i) => i === index ? { ...r, [field]: value } : r));
  };

  // Legg til ny rad
  const handleAddRow = () => {
    setRegistreringer(prev => ([...prev, { companyId: '', description: '', category: '', hours: '', date: '' }]));
  };

  // Fjern rad
  const handleRemoveRow = (index) => {
    setRegistreringer(prev => prev.filter((_, i) => i !== index));
  };

  // Send alle registreringer
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(registreringer);
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ component: 'form', onSubmit: handleSubmit }} maxWidth="sm" fullWidth>
      <DialogTitle>Registrer timer</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mt: 2, mb: 1 }}>{error}</Alert>}
        {registreringer.map((reg, idx) => (
          <Box key={idx} sx={{ width: '100%', border: idx > 0 ? 1 : 0, borderColor: 'divider', borderRadius: 2, p: idx > 0 ? 2 : 0, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
              <FormControl fullWidth margin="dense">
                <InputLabel id={`company-select-label-${idx}`}>Kunde</InputLabel>
                <Select
                  labelId={`company-select-label-${idx}`}
                  id={`companyId-${idx}`}
                  name="companyId"
                  value={reg.companyId}
                  label="Kunde"
                  onChange={e => handleChange(idx, 'companyId', e.target.value)}
                  required
                >
                  {companies.map((c) => (
                    <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <IconButton onClick={onAddCompany} color="primary" title="Legg til ny kunde" sx={{ alignSelf: 'center' }}>
                <AddCircleOutlineIcon />
              </IconButton>
              {registreringer.length > 1 && (
                <IconButton onClick={() => handleRemoveRow(idx)} color="error" title="Fjern rad" sx={{ alignSelf: 'center' }}>
                  <DeleteOutlineIcon />
                </IconButton>
              )}
            </Box>
            <TextField
              margin="dense"
              id={`description-${idx}`}
              name="description"
              label="Beskrivelse"
              type="text"
              fullWidth
              multiline
              rows={3}
              value={reg.description}
              onChange={e => handleChange(idx, 'description', e.target.value)}
              required
              sx={{ mt: 2 }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
              <FormControl fullWidth margin="dense">
                <InputLabel id={`category-select-label-${idx}`}>Kategori</InputLabel>
                <Select
                  labelId={`category-select-label-${idx}`}
                  id={`category-${idx}`}
                  name="category"
                  value={reg.category}
                  label="Kategori"
                  onChange={e => handleChange(idx, 'category', e.target.value)}
                >
                  <MenuItem value=""><em>Ingen</em></MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <IconButton onClick={onAddCategory} color="primary" title="Legg til ny kategori" sx={{ alignSelf: 'center' }}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Box>
            <TextField
              margin="dense"
              id={`hours-${idx}`}
              name="hours"
              label="Timer"
              type="number"
              fullWidth
              value={reg.hours}
              onChange={e => handleChange(idx, 'hours', e.target.value)}
              inputProps={{ step: "0.5" }}
              required
              sx={{ mt: 2 }}
            />
            <TextField
              margin="dense"
              id={`date-${idx}`}
              name="date"
              label="Dato"
              type="date"
              fullWidth
              value={reg.date}
              onChange={e => handleChange(idx, 'date', e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
              sx={{ mt: 2 }}
            />
          </Box>
        ))}
        <Button onClick={handleAddRow} variant="outlined" color="primary" sx={{ mb: 2 }}>
          Legg til ny rad
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Avbryt</Button>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? 'Lagrer...' : 'Registrer'}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 