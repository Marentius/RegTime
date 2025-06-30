import React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CompanyTimeModal({ open, onClose, company, entries, onDelete }) {
  if (!company) return null;

  const sortedEntries = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="div">Timeføringer for {company.name}</Typography>
      </DialogTitle>
      <DialogContent>
        {sortedEntries.length > 0 ? (
          <TableContainer component={Paper} sx={{ mt: 2, border: '1px solid #e0e0e0' }}>
            <Table stickyHeader aria-label="timeføringer tabell">
              <TableHead>
                <TableRow>
                  <TableCell>Dato</TableCell>
                  <TableCell>Beskrivelse</TableCell>
                  <TableCell>Kategori</TableCell>
                  <TableCell align="right">Timer</TableCell>
                  <TableCell align="center">Slett</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedEntries.map((entry) => (
                  <TableRow key={entry.id} hover>
                    <TableCell>{new Date(entry.date).toLocaleDateString('nb-NO')}</TableCell>
                    <TableCell sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{entry.description}</TableCell>
                    <TableCell>{entry.category || 'N/A'}</TableCell>
                    <TableCell align="right">{entry.hours.toFixed(2)}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => onDelete(entry.id)}
                        color="secondary"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ mt: 2, p: 3, textAlign: 'center' }}>
            <Typography>Ingen timeføringer funnet for dette selskapet.</Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Lukk</Button>
      </DialogActions>
    </Dialog>
  );
} 