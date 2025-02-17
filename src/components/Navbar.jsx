import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, useTheme } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import TimelineIcon from '@mui/icons-material/Timeline';
import InfoIcon from '@mui/icons-material/Info';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SecurityIcon from '@mui/icons-material/Security';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Live Feed', icon: <SecurityIcon />, path: '/live-feed' },
  { text: 'Timeline', icon: <TimelineIcon />, path: '/timeline' },
  { text: 'About', icon: <InfoIcon />, path: '/about' },
];

function Navbar({ showNavbar, onThemeToggle, currentTheme }) {
  const theme = useTheme();
  const location = useLocation();

  return (
    <AppBar
      position="fixed"
      sx={{
        transition: 'transform 0.3s ease-in-out',
        transform: showNavbar ? 'translateY(0)' : 'translateY(-100%)',
        background: theme.palette.mode === 'light' 
          ? 'rgba(255, 255, 255, 0.9)'
          : theme.palette.background.paper,
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${theme.palette.mode === 'light' 
          ? 'rgba(0, 0, 0, 0.06)' 
          : theme.palette.divider}`,
      }}
      elevation={0}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component={NavLink}
          to="/"
          sx={{
            textDecoration: 'none',
            color: location.pathname === '/' 
              ? theme.palette.primary.main 
              : theme.palette.text.primary,
            fontWeight: 700,
            letterSpacing: '0.5px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              color: theme.palette.primary.main,
              transform: 'translateY(-1px)',
            },
          }}
        >
          Cyber Intellect
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || 
                           (item.path === '/' && location.pathname === '/');
            
            return (
              <Button
                key={item.text}
                component={NavLink}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                  position: 'relative',
                  transition: 'all 0.2s ease-in-out',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '0',
                    left: isActive ? '10%' : '50%',
                    width: isActive ? '80%' : '0%',
                    height: '2px',
                    backgroundColor: theme.palette.primary.main,
                    transition: 'all 0.3s ease-in-out',
                  },
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: theme.palette.primary.main,
                    '&::after': {
                      left: '10%',
                      width: '80%',
                    },
                  },
                }}
              >
                {item.text}
              </Button>
            );
          })}
          
          <IconButton
            onClick={onThemeToggle}
            sx={{
              ml: 2,
              color: theme.palette.text.primary,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'rotate(90deg)',
                backgroundColor: theme.palette.mode === 'light' 
                  ? 'rgba(37, 99, 235, 0.04)' 
                  : 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            {currentTheme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 