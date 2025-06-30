import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel, Box, IconButton, Alert } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function RegisterTimeModal({ open, onClose, onSubmit, companies, values, onChange, loading, error, categories, onAddCategory, onAddCompany }) {
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ component: 'form', onSubmit: onSubmit }} maxWidth="sm" fullWidth>
      <DialogTitle>Registrer timer</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mt: 2, mb: 1 }}>{error}</Alert>}
        
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, mt: 2 }}>
          <FormControl fullWidth margin="dense">
            <InputLabel id="company-select-label">Kunde</InputLabel>
            <Select
              labelId="company-select-label"
              id="companyId"
              name="companyId"
              value={values.companyId}
              label="Kunde"
              onChange={e => onChange('companyId', e.target.value)}
              required
            >
              {companies.map((c) => (
                <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={onAddCompany} color="primary" title="Legg til ny kunde">
            <AddCircleOutlineIcon />
          </IconButton>
        </Box>
        
        <TextField
          margin="dense"
          id="description"
          name="description"
          label="Beskrivelse"
          type="text"
          fullWidth
          multiline
          rows={3}
          value={values.description}
          onChange={e => onChange('description', e.target.value)}
          required
        />
        
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
          <FormControl fullWidth margin="dense">
            <InputLabel id="category-select-label">Kategori</InputLabel>
            <Select
              labelId="category-select-label"
              id="category"
              name="category"
              value={values.category}
              label="Kategori"
              onChange={e => onChange('category', e.target.value)}
            >
              <MenuItem value=""><em>Ingen</em></MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={onAddCategory} color="primary" title="Legg til ny kategori">
            <AddCircleOutlineIcon />
          </IconButton>
        </Box>

        <TextField
          margin="dense"
          id="hours"
          name="hours"
          label="Timer"
          type="number"
          fullWidth
          value={values.hours}
          onChange={e => onChange('hours', e.target.value)}
          inputProps={{ step: "0.5" }}
          required
        />
        <TextField
          margin="dense"
          id="date"
          name="date"
          label="Dato"
          type="date"
          fullWidth
          value={values.date}
          onChange={e => onChange('date', e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
        />
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