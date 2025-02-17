import React, { useState } from 'react';
import axios from 'axios';
import { 
    Box, 
    Typography, 
    TextField, 
    Button, 
    Card, 
    CardContent,
    Grid,
    Link,
    CircularProgress,
    Alert,
    InputAdornment,
    AlertTitle,
    Chip
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import LinearProgress from '@mui/material/LinearProgress';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: 'http://localhost:5050',
    timeout: 5000, // 5 seconds timeout
    headers: {
        'Content-Type': 'application/json'
    }
});

function IPAbuseCheck() {
    const theme = useTheme();
    const [ipAddress, setIpAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ipData, setIpData] = useState(null);

    const checkIP = async () => {
        if (!ipAddress) return;
        
        setLoading(true);
        setError(null);

        try {
            const response = await api.get('/api/check-ip', {
                params: {
                    ipAddress: ipAddress
                }
            });

            console.log('API Response:', response.data);
            setIpData(response.data.data);
        } catch (err) {
            console.error('Error:', err);
            setError(
                err.response?.data?.message || 
                err.message || 
                'Failed to fetch IP data'
            );
        } finally {
            setLoading(false);
        }
    };

    // Handle Enter key press
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !loading && ipAddress) {
            checkIP();
        }
    };

    // Format confidence score color
    const getConfidenceColor = (score) => {
        if (score > 80) return theme.palette.error.main;
        if (score > 50) return theme.palette.warning.main;
        return theme.palette.success.main;
    };

    // Function to determine progress bar color
    const getProgressBarColor = (score) => {
        if (score > 80) return theme.palette.error.main;
        if (score > 50) return theme.palette.warning.main;
        return theme.palette.success.main;
    };

    return (
        <Box sx={{ 
            p: 3,
            minHeight: '89vh',
            backgroundColor: theme.palette.background.default
        }}>
            {/* Header with Citation */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ 
                    fontWeight: 'bold', 
                    color: theme.palette.primary.main,
                    mb: 1
                }}>
                    IP Abuse Check
                </Typography>
                <Typography variant="caption" sx={{ 
                    display: 'block', 
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                    fontStyle: 'italic',
                    mb: 3
                }}>
                    Powered by{' '}
                    <Link 
                        href="https://www.abuseipdb.com" 
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: 'inherit' }}
                    >
                        AbuseIPDB
                    </Link>
                </Typography>

                {/* Search Box */}
                <Box sx={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    mb: 4
                }}>
                    <TextField
                        value={ipAddress}
                        onChange={(e) => setIpAddress(e.target.value)}
                        placeholder="Enter IP address..."
                        variant="outlined"
                        sx={{ width: '400px' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <NetworkCheckIcon />
                                </InputAdornment>
                            ),
                        }}
                        onKeyDown={handleKeyPress}
                    />
                    <Button 
                        variant="contained"
                        onClick={checkIP}
                        disabled={loading || !ipAddress}
                        startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
                    >
                        Check IP
                    </Button>
                </Box>

                {/* Error Message */}
                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {/* Results */}
                {ipData && (
                    <Card sx={{ 
                        maxWidth: 800, 
                        mx: 'auto',
                        backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.05)' 
                            : 'rgba(255, 255, 255, 0.9)',
                    }}>
                        <CardContent>
                            {/* Header with IP */}
                            <Typography variant="h5" gutterBottom sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                gap: 1,
                                mb: 3
                            }}>
                                <span style={{ fontWeight: 'bold' }}>{ipData.ipAddress}</span>
                                <Typography component="span" variant="body2">
                                    (IPv{ipData.ipVersion})
                                </Typography>
                            </Typography>

                            {/* Abuse Score Section */}
                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 1
                                }}>
                                    <Typography variant="body1">
                                        This IP was reported <strong>{ipData.totalReports}</strong> times. 
                                        Confidence of Abuse is <strong>{ipData.abuseConfidenceScore}%</strong>
                                    </Typography>
                                    <Tooltip title="Learn more about confidence scores">
                                        <InfoIcon sx={{ color: 'text.secondary', cursor: 'pointer' }} />
                                    </Tooltip>
                                </Box>
                                
                                {/* Progress Bar */}
                                <Box sx={{ 
                                    height: 40, 
                                    backgroundColor: theme.palette.grey[200],
                                    borderRadius: 1,
                                    overflow: 'hidden'
                                }}>
                                    <Box
                                        sx={{
                                            width: `${ipData.abuseConfidenceScore}%`,
                                            height: '100%',
                                            backgroundColor: getProgressBarColor(ipData.abuseConfidenceScore),
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            transition: 'width 0.5s ease-in-out',
                                            minWidth: '40px'
                                        }}
                                    >
                                        <Typography variant="body1" fontWeight="bold">
                                            {ipData.abuseConfidenceScore}%
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Information Table */}
                            <Box sx={{ 
                                mb: 3,
                                '& .MuiGrid-item': {
                                    borderBottom: 1,
                                    borderColor: 'divider',
                                    py: 1.5
                                }
                            }}>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <Typography variant="subtitle2">ISP</Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography>{ipData.isp}</Typography>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <Typography variant="subtitle2">Usage Type</Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography>{ipData.usageType}</Typography>
                                    </Grid>

                                    {ipData.hostnames && ipData.hostnames.length > 0 && (
                                        <>
                                            <Grid item xs={3}>
                                                <Typography variant="subtitle2">Hostname(s)</Typography>
                                            </Grid>
                                            <Grid item xs={9}>
                                                {ipData.hostnames.map((hostname, index) => (
                                                    <Typography key={index}>{hostname}</Typography>
                                                ))}
                                            </Grid>
                                        </>
                                    )}

                                    <Grid item xs={3}>
                                        <Typography variant="subtitle2">Domain Name</Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography>{ipData.domain || 'N/A'}</Typography>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <Typography variant="subtitle2">Country</Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography>{ipData.countryName} ({ipData.countryCode})</Typography>
                                    </Grid>
                                </Grid>
                            </Box>

                            {/* Whitelist Notice */}
                            {ipData.isWhitelisted && (
                                <Alert severity="info" sx={{ mb: 3 }}>
                                    <AlertTitle>Important Note</AlertTitle>
                                    This IP address is within our whitelist. Whitelisted IPs are typically 
                                    owned by trusted entities, but their services can sometimes be abused. 
                                    Exercise caution when trusting or distrusting these IPs.
                                </Alert>
                            )}

                            {/* Recent Reports */}
                            {ipData.reports && ipData.reports.length > 0 && (
                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Recent Reports ({ipData.reports.length})
                                    </Typography>
                                    <Box sx={{ 
                                        maxHeight: '300px', 
                                        overflowY: 'auto',
                                        borderRadius: 1,
                                        border: 1,
                                        borderColor: 'divider'
                                    }}>
                                        {ipData.reports.map((report, index) => (
                                            <Box 
                                                key={index} 
                                                sx={{ 
                                                    p: 2,
                                                    borderBottom: index !== ipData.reports.length - 1 ? 1 : 0,
                                                    borderColor: 'divider',
                                                    '&:hover': {
                                                        backgroundColor: 'action.hover'
                                                    }
                                                }}
                                            >
                                                <Typography variant="subtitle2" color="primary" gutterBottom>
                                                    {new Date(report.reportedAt).toLocaleString()}
                                                </Typography>
                                                {report.comment && (
                                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                                        {report.comment}
                                                    </Typography>
                                                )}
                                                {report.categories && (
                                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                        {report.categories.map((category, idx) => (
                                                            <Chip 
                                                                key={idx}
                                                                label={category}
                                                                size="small"
                                                                variant="outlined"
                                                            />
                                                        ))}
                                                    </Box>
                                                )}
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            )}

                            {/* Action Buttons */}
                            <Box sx={{ 
                                display: 'flex', 
                                gap: 2, 
                                mt: 3,
                                '& .MuiButton-root': {
                                    flex: 1
                                }
                            }}>
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    onClick={() => window.open(`https://www.abuseipdb.com/report?ip=${ipData.ipAddress}`, '_blank')}
                                >
                                    Report {ipData.ipAddress}
                                </Button>
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    onClick={() => window.open(`https://www.abuseipdb.com/whois/${ipData.ipAddress}`, '_blank')}
                                >
                                    Whois {ipData.ipAddress}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                )}
            </Box>
        </Box>
    );
}

export default IPAbuseCheck; 