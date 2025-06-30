import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

export default function AddCompanyModal({ open, onClose, onSubmit, value, onChange, loading }) {
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ component: 'form', onSubmit: onSubmit }}>
      <DialogTitle>Legg til ny kunde</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Kundenavn"
          type="text"
          fullWidth
          variant="standard"
          value={value}
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Avbryt</Button>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Lagrer..." : "Opprett kunde"}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 