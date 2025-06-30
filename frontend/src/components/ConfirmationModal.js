import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function ConfirmationModal({ open, onClose, onConfirm, title, message, loading }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Avbryt
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" disabled={loading} autoFocus>
          {loading ? "Sletter..." : "Bekreft sletting"}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 