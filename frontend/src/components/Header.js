import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

export default function Header({ onRegistrere, onKalender, onSummering, onDashboard }) {
  const handleLogout = () => {
    localStorage.removeItem('userId');
    window.location.href = '/login';
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  return (
    <AppBar position="static" color="transparent" sx={{
      position: 'sticky',
      top: 0,
      zIndex: 1100,
      background: 'linear-gradient(180deg, rgba(15,10,30,0.00) 0%, rgba(15,10,30,0.40) 40%, rgba(15,10,30,0.40) 60%, rgba(15,10,30,0.00) 100%)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.03)',
      borderBottom: 'none',
      borderRadius: { xs: '0 0 24px 24px', md: '0 0 32px 32px' },
      mx: { xs: 0, md: 2 },
      transition: 'background 0.4s',
    }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          minHeight: { xs: 56, md: 64 },
          px: { xs: 1, md: 3 },
        }}
      >
        {/* Logo-boks */}
        <Box
          sx={{
            background: { xs: 'none', md: 'linear-gradient(135deg, #7b1fa2 0%, #1976d2 100%)' },
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: { xs: 0, md: 2 },
            mr: 3,
            px: { xs: 1.5, md: 3 },
            py: { xs: 0.5, md: 1.2 },
            minWidth: { xs: 0, md: 120 },
            minHeight: { xs: 0, md: 48 },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 900, fontSize: { xs: '1.1rem', md: '2rem' }, lineHeight: 1, whiteSpace: 'nowrap' }}>
            <Box component="span" sx={{ color: 'primary.main' }}>Reg</Box>
            <Box component="span" sx={{ color: '#fff', ml: 0.2 }}>Time</Box>
          </Typography>
        </Box>
        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleDrawerToggle} edge="end">
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              PaperProps={{ sx: { backgroundColor: 'background.paper', minWidth: 200 } }}
            >
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => { onKalender(); setDrawerOpen(false); }}>
                    <ListItemText primary="Kalender" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => { onSummering(); setDrawerOpen(false); }}>
                    <ListItemText primary="Summering" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => { onDashboard(); setDrawerOpen(false); }}>
                    <ListItemText primary="Dashbord" />
                  </ListItemButton>
                </ListItem>
                {/* Registrer ny tid flyttes ut på mobil */}
                <ListItem disablePadding sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <ListItemButton onClick={() => { onRegistrere(); setDrawerOpen(false); }}>
                    <ListItemText primary="Registrer ny tid" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemText primary="Logg ut" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button color="inherit" onClick={onKalender} sx={{ fontSize: { xs: '0.95rem', md: '0.95rem' }, px: { xs: 2, md: 3 }, py: { xs: 1, md: 1.5 } }}>Kalender</Button>
            <Button color="inherit" onClick={onSummering} sx={{ fontSize: { xs: '0.95rem', md: '0.95rem' }, px: { xs: 2, md: 3 }, py: { xs: 1, md: 1.5 } }}>Summering</Button>
            <Button color="inherit" onClick={onDashboard} sx={{ fontSize: { xs: '0.95rem', md: '0.95rem' }, px: { xs: 2, md: 3 }, py: { xs: 1, md: 1.5 } }}>Dashbord</Button>
            <Button variant="contained" onClick={onRegistrere} sx={{ ml: 2, fontSize: { xs: '0.95rem', md: '0.95rem' }, px: { xs: 2.5, md: 4 }, py: { xs: 1.2, md:  1} }}>
              Registrer ny tid
            </Button>
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{ ml: 2, borderColor: 'primary.main', color: 'primary.main' }}
              startIcon={<LogoutIcon />}
            >
              Logg ut
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
