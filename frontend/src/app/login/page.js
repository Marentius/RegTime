'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as api from '../../lib/api';
import { Button, TextField, Card, CardContent, CardActions, Typography, Container, Box, Alert } from '@mui/material';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.login({ username, password });
      if (response.userId) {
        localStorage.setItem('userId', response.userId);
        router.push('/');
      } else {
        setError('Ugyldig respons fra server');
      }
    } catch (err) {
      setError(err.message || 'Feil brukernavn eller passord');
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth={false} disableGutters sx={{ width: '100vw', minHeight: '100vh', px: 0, mx: 0 }}>
      <Box
        sx={{
          width: '100vw',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Logo/illustrasjon - flyttet øverst */}
        <Box
          sx={{
            width: { xs: 110, md: 220 },
            height: { xs: 70, md: 180 },
            background: { xs: 'none', md: 'linear-gradient(135deg, #7b1fa2 0%, #1976d2 100%)' },
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: { xs: 0, md: 4 },
            mb: { xs: 2, md: 5 },
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 900, fontSize: { xs: '2rem', md: '2.8rem' } }}>
            <Box component="span" sx={{ color: 'primary.main' }}>Reg</Box>
            <Box component="span" sx={{ color: '#fff' }}>Time</Box>
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            minHeight: 500,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 2, md: 10 },
            py: { xs: 2, md: 8 },
            px: { xs: 1, md: 0 },
          }}
        >
          {/* Forklaringstekst */}
          <Box
            sx={{
              flex: 1,
              minWidth: { xs: 0, md: 420 },
              maxWidth: { xs: 500, md: 600 },
              p: { xs: 2, md: 5 },
              borderRadius: 5,
              background: 'rgba(120, 60, 180, 0.18)',
              boxShadow: 4,
              color: '#fff',
              mb: { xs: 2, md: 0 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: { xs: 'center', md: 'flex-start' },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '1.3rem', md: '2.2rem' } }}>
              Enkel timeregistrering<br />for deg som fakturerer til kunder
            </Typography>
            <Typography variant="h6" sx={{ color: 'primary.main', mb: 2, fontWeight: 600, fontSize: { xs: '1rem', md: '1.2rem' } }}>
              RegTime gir deg full kontroll på rapportering og hvor mange timer du skal fakturere dine kunder.
            </Typography>
            <Typography variant="body1" sx={{ color: '#e0e0e0', fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
              Logg inn eller registrer deg gratis for å oppleve enkel, sikker og oversiktlig timeføring – utviklet for profesjonelle.
            </Typography>
          </Box>

          {/* Login-boks */}
          <Card sx={{ flex: 1, minWidth: { xs: 0, md: 320 }, maxWidth: { xs: 500, md: 400 }, width: '100%', boxShadow: 6, display: 'flex', justifyContent: 'center', mx: { xs: 0, md: 2 } }}>
            <form onSubmit={handleLogin} style={{ width: '100%' }}>
              <CardContent>
                <Typography sx={{ mb: 2, fontSize: { xs: '1rem', md: '1.1rem' } }}>
                  Vennligst oppgi brukernavn og passord for å fortsette.
                </Typography>
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
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Link href="/login/register" passHref>
                  <Button variant="text">Registrer ny bruker</Button>
                </Link>
              </Box>
            </form>
          </Card>
        </Box>
      </Box>
      <Box component="footer" sx={{
        width: '100vw',
        py: 2,
        textAlign: 'center',
        color: 'text.secondary',
        fontSize: { xs: '0.95rem', md: '1rem' },
        letterSpacing: 0.2,
        background: 'transparent',
        position: 'fixed',
        left: 0,
        bottom: 0,
        zIndex: 100,
      }}>
        <Typography variant="body2">
          Laget av Vetle Marentius &copy; {new Date().getFullYear()}
        </Typography>
      </Box>
    </Container>
  );
} 