import React from 'react';
import { 
    Box, 
    Typography, 
    Button, 
    Container,
    useTheme 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function NotFound() {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    minHeight: '89vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 3,
                }}
            >
                {/* Error Icon */}
                <ErrorOutlineIcon 
                    sx={{ 
                        fontSize: 100,
                        color: theme.palette.error.main,
                        animation: 'pulse 2s infinite',
                        '@keyframes pulse': {
                            '0%': {
                                transform: 'scale(1)',
                                opacity: 1,
                            },
                            '50%': {
                                transform: 'scale(1.1)',
                                opacity: 0.7,
                            },
                            '100%': {
                                transform: 'scale(1)',
                                opacity: 1,
                            },
                        },
                    }} 
                />

                {/* Error Code */}
                <Typography
                    variant="h1"
                    sx={{
                        fontWeight: 'bold',
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.error.main})`,
                        backgroundClip: 'text',
                        textFillColor: 'transparent',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    404
                </Typography>

                {/* Error Message */}
                <Typography
                    variant="h4"
                    sx={{
                        mb: 2,
                        color: theme.palette.text.primary,
                    }}
                >
                    Page Not Found
                </Typography>

                {/* Error Description */}
                <Typography
                    variant="body1"
                    sx={{
                        color: theme.palette.text.secondary,
                        maxWidth: '600px',
                        mb: 4,
                    }}
                >
                    Oops! The page you're looking for seems to have vanished into the cyber void. 
                    Don't worry, even the best security systems have their blind spots.
                </Typography>

                {/* Action Buttons */}
                <Box sx={{ 
                    display: 'flex', 
                    gap: 2,
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    <Button
                        variant="contained"
                        startIcon={<HomeIcon />}
                        onClick={() => navigate('/')}
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                            },
                        }}
                    >
                        Back to Home
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate(-1)}
                        sx={{
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                            '&:hover': {
                                borderColor: theme.palette.primary.dark,
                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            },
                        }}
                    >
                        Go Back
                    </Button>
                </Box>

                {/* Easter Egg */}
                <Typography
                    variant="caption"
                    sx={{
                        mt: 4,
                        color: theme.palette.text.disabled,
                        cursor: 'default',
                        '&:hover': {
                            color: theme.palette.primary.main,
                        },
                    }}
                >
                    {`< Error_404: Security breach not found />`}
                </Typography>
            </Box>
        </Container>
    );
}

export default NotFound; 