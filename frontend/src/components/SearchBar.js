import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({ onSearch, placeholder }) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      onChange={(e) => onSearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: '#666' }} />
          </InputAdornment>
        ),
        style: {
          color: '#222', // mørk tekst
        },
      }}
      sx={{
        backgroundColor: 'white',
        '& .MuiInputBase-input::placeholder': {
          color: '#888',
          opacity: 1,
        },
      }}
    />
  );
} 