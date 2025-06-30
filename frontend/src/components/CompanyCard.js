import React from 'react';
import { Card, CardActionArea, CardContent, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CompanyCard({ name, onClick, onDelete }) {
  // Forhindre at klikk på sletteknappen også utløser 'onClick' på kortet
  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Stopper event-bobling
    onDelete();
  };

  return (
    <Card
      sx={{
        position: 'relative',
        borderRadius: 2, // 16px
        minHeight: { xs: 180, sm: 220, md: 260 },
        width: '100%',
        minWidth: 0,
        background: 'linear-gradient(135deg, rgba(169,98,255,0.18) 0%, rgba(239,106,173,0.10) 100%)',
        boxShadow: '0 4px 24px 0 rgba(169,98,255,0.10)',
        overflow: 'visible',
        p: 0,
        transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s',
        '&:hover': {
          transform: 'translateY(-3px) scale(1.03)',
          boxShadow: '0 8px 32px 0 rgba(169,98,255,0.18)',
        },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          borderRadius: 2,
          p: { xs: 2, sm: 3 },
          minHeight: { xs: 180, sm: 220, md: 260 },
          width: '100%',
          minWidth: 0,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <CardContent sx={{
          p: 0,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Typography
            variant="h6"
            component="div"
            align="center"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.5rem', sm: '2rem' },
              letterSpacing: 0.5,
              color: 'text.primary',
              textShadow: '0 2px 8px rgba(0,0,0,0.10)',
              width: '100%',
              wordBreak: 'break-word',
            }}
          >
            {name}
          </Typography>
        </CardContent>
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
          <IconButton
            aria-label="delete"
            onClick={handleDeleteClick}
            sx={{
              color: 'secondary.main',
              background: 'rgba(239,106,173,0.10)',
              '&:hover': {
                background: 'rgba(239,106,173,0.22)',
                color: 'error.main',
              },
              boxShadow: '0 2px 8px 0 rgba(239,106,173,0.10)',
            }}
            size="medium"
          >
            <DeleteIcon fontSize="medium" />
          </IconButton>
        </Box>
      </CardActionArea>
    </Card>
  );
} 