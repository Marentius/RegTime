'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as api from '../../lib/api';
import { Button, TextField, Card, CardContent, CardActions, Typography, Container, Box, Alert } from '@mui/material';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.login(password);
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/');
    } catch (err) {
      setError('Feil passord. Vennligst prøv igjen.');
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Reg<Box component="span" sx={{ color: 'primary.main' }}>Time</Box>
        </Typography>
        <Card sx={{ minWidth: 275, width: '100%', mt: 3 }}>
          <form onSubmit={handleLogin}>
            <CardContent>
              <Typography sx={{ mb: 2 }}>
                Vennligst oppgi passord for å fortsette.
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Passord"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            </CardContent>
            <CardActions>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mx: 1, mb: 1 }}
              >
                {loading ? 'Logger inn...' : 'Logg inn'}
              </Button>
            </CardActions>
          </form>
        </Card>
      </Box>
    </Container>
  );
} 