import { Box, Typography, Card, CardContent, Stack } from '@mui/material';
import WorldMap from '../components/WorldMap';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import WarningIcon from '@mui/icons-material/Warning';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';


function Dashboard() {
  const theme = useTheme();
  const navigate = useNavigate();

  const navigationCards = [
    {
      title: 'Live Threat Feeds',
      description: 'Real-time cyber security threat monitoring',
      icon: <SecurityIcon sx={{ fontSize: 40 }}/>,
      path: '/live-feed',
      color: theme.palette.primary.main
    },
    {
      title: 'Who Have Been Pwned',
      description: 'Database of compromised websites and accounts',
      icon: <WarningIcon sx={{ fontSize: 40 }}/>,
      path: '/pwned',
      color: theme.palette.error.main
    },
    {
      title: 'IP Abuse Check',
      description: 'Check and report abusive IP addresses',
      icon: <ReportProblemIcon sx={{ fontSize: 40 }}/>,
      path: '/ip-abuse',
      color: theme.palette.warning.main  
    },
    {
      title: 'Resources',
      description: 'Security guides, tools, and documentation',
      icon: <LibraryBooksIcon sx={{ fontSize: 40 }}/>,
      path: '/resources',
      color: theme.palette.success.main
    }
  ];

  return (
    <Box sx={{ 
      height: '100vh',
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      display: 'grid',
      gridTemplateColumns: '1fr 3fr',
      gap: 3,
      p: 3
    }}>
      {/* Navigation Cards */}
      <Stack spacing={2}>
        {navigationCards.map((card, index) => (
          <Card 
            key={index}
            onClick={() => navigate(card.path)}
            sx={{ 
              cursor: 'pointer',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: `0 8px 24px rgba(${card.color}, 0.2)`,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                <Box sx={{ color: card.color }}>
                  {card.icon}
                </Box>
                <Typography variant="h6" component="div">
                  {card.title}
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* World Map */}
      <Box sx={{ position: 'relative' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
          Cyber Threat Map
        </Typography>
        <WorldMap width={800} height={500} />
      </Box>
    </Box>
  );
}

export default Dashboard;