import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

export default function AddCategoryModal({ open, onClose, onSubmit, value, onChange, loading }) {
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ component: 'form', onSubmit: onSubmit }}>
      <DialogTitle>Legg til ny kategori</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Kategorinavn"
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
          {loading ? "Lagrer..." : "Opprett kategori"}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 