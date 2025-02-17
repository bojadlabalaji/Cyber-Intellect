import { Box, Typography, Card, CardContent, Avatar, IconButton, Stack, Paper } from '@mui/material';
import { useTheme } from '@mui/system';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

function About() {
  const theme = useTheme();
  const [testData, setTestData] = useState(null);
  const [countryStats, setCountryStats] = useState(null);
  const [error, setError] = useState(null);

  // Updated API calls
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch test data
        const testResponse = await axios.get('/api/test');
        setTestData(testResponse.data);
        
        // Fetch country stats
        const statsResponse = await axios.get('/api/country-stats');
        setCountryStats(statsResponse.data);
        console.log('Country Stats Response:', statsResponse.data);
        
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to connect to backend server. Please make sure the server is running on port 5050.');
      }
    };

    fetchData();
  }, []);

  const teamMembers = [
    {
      name: 'Balaji Bojadla',
      role: 'Full Stack Developer',
      title: 'Graduate Student',
      university: 'University of Cincinnati',
      description: 'Specializing in Data-Driven Cybersecurity and Full Stack Development',
      imageUrl: 'https://media.licdn.com/dms/image/v2/D5635AQE_iQQYsi9m7g/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1706587925839?e=1732813200&v=beta&t=lL5Mx0IUTMAS8tXdokuIIcXlPBjoPv5cZnNcAGj6L2Y',
      links: {
        linkedin: 'https://www.linkedin.com/in/bojadlabalaji',
        github: 'https://github.com/bojadlabalaji',
        email: 'bojadlbi@mail.uc.edu'
      }
    },
    {
      name: 'Mallikarjunarao Kovi',
      role: 'Backend Developer',
      title: 'Graduate Student',
      university: 'University of Cincinnati',
      description: 'Focused on Backend Architecture and Security Implementation',
      imageUrl: 'https://media.licdn.com/dms/image/v2/D5635AQGXW0U7XhrOLA/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1660002772504?e=1732813200&v=beta&t=_NZq40FwmpcMpheM8WPSJWr2rUO1degNIHzGb6rX9pE',
      links: {
        linkedin: 'https://www.linkedin.com/in/mallikarjunarao-kovi',
        github: 'https://github.com/mallikarjunarao',
        email: 'kovimo@mail.uc.edu'
      }
    },
    {
      name: 'Kavya Boddu',
      role: 'Frontend Developer',
      title: 'Graduate Student',
      university: 'University of Cincinnati',
      description: 'Expert in UI/UX Design and Frontend Development',
      imageUrl: 'https://media.licdn.com/dms/image/v2/D5635AQHZTDoGUKnYFw/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1726684814269?e=1732813200&v=beta&t=vAmowEHTaUND2aSkU8srdGkHf1c3iBOxg7BRK4LOZQw',
      links: {
        linkedin: 'https://www.linkedin.com/in/kavya-boddu',
        github: 'https://github.com/kavyaboddu',
        email: 'bodduka@mail.uc.edu'
      }
    }
  ];

  return (
    <Box 
      sx={{ 
        padding: 4,
        maxWidth: '1200px',
        margin: '0 auto',
        minHeight: '100vh',
      }}
    >
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{
          textAlign: 'center',
          mb: 6,
          fontWeight: 'bold',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(45deg, #00a0fc, #0062ff)'
            : 'linear-gradient(45deg, #2563eb, #1e40af)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
      >
        Meet Our Team
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 4,
          justifyItems: 'center',
        }}
      >
        {teamMembers.map((member, index) => (
          <Card
            key={index}
            sx={{
              maxWidth: 350,
              width: '100%',
              transition: 'all 0.3s ease-in-out',
              background: theme.palette.mode === 'dark'
                ? 'rgba(19, 47, 76, 0.4)'
                : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              border: `1px solid ${theme.palette.divider}`,
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 8px 24px rgba(0, 160, 252, 0.2)'
                  : '0 8px 24px rgba(37, 99, 235, 0.1)',
              },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                backgroundColor: theme.palette.mode === 'dark'
                  ? 'rgba(0, 160, 252, 0.1)'
                  : 'rgba(37, 99, 235, 0.1)',
                pt: 4,
                pb: 2,
                textAlign: 'center',
              }}
            >
              <Avatar
                alt={member.name}
                src={member.imageUrl}
                sx={{
                  width: 120,
                  height: 120,
                  margin: '0 auto',
                  border: `4px solid ${theme.palette.background.paper}`,
                  boxShadow: '0 0 20px rgba(0,0,0,0.1)',
                }}
              />
            </Box>

            <CardContent sx={{ textAlign: 'center', pt: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                {member.name}
              </Typography>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                {member.role}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {member.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {member.university}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  mt: 2,
                  mb: 3,
                  color: theme.palette.text.secondary,
                  px: 2
                }}
              >
                {member.description}
              </Typography>

              <Stack 
                direction="row" 
                spacing={2} 
                justifyContent="center"
                sx={{ mt: 2 }}
              >
                <IconButton 
                  href={member.links.linkedin} 
                  target="_blank"
                  sx={{ 
                    color: theme.palette.primary.main,
                    '&:hover': { transform: 'scale(1.1)' }
                  }}
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton 
                  href={member.links.github} 
                  target="_blank"
                  sx={{ 
                    color: theme.palette.text.primary,
                    '&:hover': { transform: 'scale(1.1)' }
                  }}
                >
                  <GitHubIcon />
                </IconButton>
                <IconButton 
                  href={`mailto:${member.links.email}`}
                  sx={{ 
                    color: theme.palette.secondary.main,
                    '&:hover': { transform: 'scale(1.1)' }
                  }}
                >
                  <EmailIcon />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography 
          variant="h5" 
          gutterBottom
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: theme.palette.text.primary,
          }}
        >
          Backend Connection Tests
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            mt: 2,
            background: theme.palette.mode === 'dark'
              ? 'rgba(19, 47, 76, 0.4)'
              : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
          }}
        >
          {error ? (
            <Typography color="error" sx={{ textAlign: 'center' }}>
              {error}
            </Typography>
          ) : (
            <>
              {/* Test Data Section */}
              {testData && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Test Response:
                  </Typography>
                  <Typography 
                    component="pre"
                    sx={{
                      p: 2,
                      borderRadius: 1,
                      backgroundColor: theme.palette.mode === 'dark'
                        ? 'rgba(0, 0, 0, 0.2)'
                        : 'rgba(0, 0, 0, 0.05)',
                      overflowX: 'auto',
                      fontFamily: 'monospace',
                    }}
                  >
                    {JSON.stringify(testData, null, 2)}
                  </Typography>
                </Box>
              )}

              

              {!testData && !countryStats && (
                <Typography sx={{ textAlign: 'center' }}>
                  Loading data...
                </Typography>
              )}
            </>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default About;
