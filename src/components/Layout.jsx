import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';

function Layout({ children, onThemeToggle, currentTheme }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      const isAtBottom = 
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;
      
      // Always show navbar when at the top or bottom
      if (currentScrollY < 20 || isAtBottom) {
        setShowNavbar(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      }

      setLastScrollY(currentScrollY);
    };

    // Add throttling to prevent excessive updates
    let timeoutId;
    const throttledControlNavbar = () => {
      if (timeoutId) return;
      
      timeoutId = setTimeout(() => {
        controlNavbar();
        timeoutId = null;
      }, 100);
    };

    window.addEventListener('scroll', throttledControlNavbar, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledControlNavbar);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [lastScrollY]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar
        showNavbar={showNavbar}
        onThemeToggle={onThemeToggle}
        currentTheme={currentTheme}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 8,
          px: 3,
          transition: 'padding-top 0.3s ease-in-out',
          mt: showNavbar ? 0 : -8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
