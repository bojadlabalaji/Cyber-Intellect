import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';
import { darkTheme, lightTheme } from './theme';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Timeline from './pages/Timeline';
import About from './pages/About';
import LiveFeed from './pages/LiveFeed';
import WhoHaveBeenPwned from './pages/WhoHaveBeenPwned';
import IPAbuseCheck from './pages/IPAbuseCheck';
import Resources from './pages/Resources';
import NotFound from './pages/NotFound';
import { useState } from 'react';

function App() {
  const [currentTheme, setCurrentTheme] = useState('dark');

  const handleThemeToggle = () => {
    setCurrentTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
        <CssBaseline />
        <Router future={{ 
          v7_startTransition: true,
          v7_relativeSplatPath: true 
        }}>
          <Layout onThemeToggle={handleThemeToggle} currentTheme={currentTheme}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/about" element={<About />} />
              <Route path="/live-feed" element={<LiveFeed />} />
              <Route path="/pwned" element={<WhoHaveBeenPwned />} />
              <Route path="/ip-abuse" element={<IPAbuseCheck />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;