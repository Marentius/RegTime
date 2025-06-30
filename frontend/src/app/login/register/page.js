'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as api from '../../../lib/api';
import { Button, TextField, Card, CardContent, CardActions, Typography, Container, Box, Alert } from '@mui/material';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await api.register({ username, password });
      setSuccess('Bruker opprettet! Du kan nå logge inn.');
      setTimeout(() => router.push('/login'), 1500);
    } catch (err) {
      setError(err.message || 'Noe gikk galt. Prøv igjen.');
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
          Registrer ny bruker
        </Typography>
        <Card sx={{ minWidth: 275, width: '100%', mt: 3 }}>
          <form onSubmit={handleRegister}>
            <CardContent>
              <TextField
                margin="normal"
                required
                fullWidth
                name="username"
                label="Brukernavn"
                type="text"
                id="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Passord"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
            </CardContent>
            <CardActions>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mx: 1, mb: 1 }}
              >
                {loading ? 'Registrerer...' : 'Registrer'}
              </Button>
            </CardActions>
          </form>
        </Card>
      </Box>
    </Container>
  );
} 