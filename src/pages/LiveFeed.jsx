import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, Typography, Stack } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DangerousIcon from '@mui/icons-material/Dangerous';

// Continuous flowing animation
const flowUpAnimation = keyframes`
  0% {
    transform: translate(-50%, 90vh);
    opacity: 0;
  }
  10% {
    transform: translate(-50%, 80vh);
    opacity: 1;
  }
  80% {
    transform: translate(-50%, 15vh);
    opacity: 1;
  }
  110% {
    transform: translate(-50%, 10vh);
    opacity: 0;
  }
`;

const AnimatedCard = styled(Card)(({ delay }) => ({
  width: '400px',
  position: 'absolute',
  left: '50%',
  animation: `${flowUpAnimation} 10s linear forwards`,
  animationDelay: `${delay}s`,
  opacity: 0,
}));

function LiveFeed() {
    const [feeds, setFeeds] = useState([]);
    const [displayFeeds, setDisplayFeeds] = useState([]);

    // Fetch data every 30 seconds
    useEffect(() => {
        const fetchFeeds = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/live-feeds');
                if (response.data.data) {
                    setFeeds(response.data.data);
                }
            } catch (err) {
                console.error('Error:', err);
            }
        };

        fetchFeeds();
        // get data every 30 seconds
        const interval = setInterval(fetchFeeds, 30000);
        return () => clearInterval(interval);
    }, []);

    // Handle the continuous display of feeds
    useEffect(() => {
        if (feeds.length === 0) return;
        
        let currentIndex = 0;
        const displayInterval = setInterval(() => {
            setDisplayFeeds(prev => {
                const newFeed = {
                    ...feeds[currentIndex],
                    displayId: Date.now()
                };
                currentIndex = (currentIndex + 1) % feeds.length;
                return [...prev, newFeed].slice(-5);
            });
        }, 2000);

        return () => clearInterval(displayInterval);
    }, [feeds]);

    return (
        <Box sx={{ 
            height: '89vh',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Header */}
            <Typography 
                variant="h4" 
                sx={{ 
                    textAlign: 'center', 
                    py: 3,
                    fontWeight: 'bold',
                    color: theme => theme.palette.primary.main,
                    position: 'relative',
                    zIndex: 2
                }}
            >
                Live Security Feeds
            </Typography>

            {/* Source Citation */}
            <Typography 
                variant="caption" 
                sx={{ 
                    textAlign: 'center',
                    mb: 2,
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                    fontStyle: 'italic'
                }}
            >
                Data sourced from Check Point Research ThreatMap - visit{' '}
                <a 
                    href="https://threatmap.checkpoint.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                        color: 'inherit',
                        textDecoration: 'underline'
                    }}
                >
                    threatmap.checkpoint.com
                </a>
                {' '}for more information
            </Typography>

            {/* Container for flowing cards */}
            <Box sx={{ 
                position: 'relative',
                width: '100%',
                flexGrow: 1,
                overflow: 'hidden'
            }}>
                {displayFeeds.map((feed, index) => (
                    <AnimatedCard 
                        key={feed.displayId}
                        delay={index * 0.5}
                        elevation={3}
                        sx={{
                            p: 1.5,
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            minHeight: '100px',
                        }}
                    >
                        <Stack spacing={1}>
                            {/* Header with icon and name */}
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <DangerousIcon 
                                    sx={{ 
                                        fontSize: 24,
                                        color: '#FF0000' 
                                    }} 
                                />
                                <Typography 
                                    variant="subtitle1" 
                                    sx={{ 
                                        flexGrow: 1,
                                        fontSize: '0.9rem',
                                        fontWeight: 'medium'
                                    }}
                                >
                                    {feed.name}
                                </Typography>
                            </Stack>

                            {/* Details row */}
                            <Stack 
                                direction="row" 
                                alignItems="center" 
                                spacing={2}
                                sx={{ color: 'text.secondary' }}
                            >
                                <Typography variant="caption">
                                    {feed.details}
                                </Typography>
                            </Stack>
                        </Stack>
                    </AnimatedCard>
                ))}
            </Box>
        </Box>
    );
}

export default LiveFeed;