import React, { useState, useEffect, useMemo } from 'react';
import { 
    Box, 
    Typography, 
    Card, 
    CardContent, 
    Grid, 
    Link, 
    Skeleton, 
    Button,
    TextField,
    InputAdornment,
    Select,
    MenuItem,
    ToggleButton,
    ToggleButtonGroup,
    FormControl,
    InputLabel,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import breachesData from '../data/breaches.json';

function WhoHaveBeenPwned() {
    const theme = useTheme();
    const [displayedBreaches, setDisplayedBreaches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('BreachDate');
    const [sortOrder, setSortOrder] = useState('desc');
    const itemsPerPage = 5;

    // Sorting options
    const sortOptions = [
        { value: 'Title', label: 'Title' },
        { value: 'BreachDate', label: 'Breach Date' },
        { value: 'AddedDate', label: 'Date Added' },
        { value: 'PwnCount', label: 'Compromised Accounts' },
    ];

    // Format date helper function
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Filter and sort breaches
    const filteredAndSortedBreaches = useMemo(() => {
        // First filter
        const filtered = breachesData.filter(breach => {
            if (!searchQuery) return true;
            
            const searchText = searchQuery.toLowerCase();
            const breachDate = formatDate(breach.BreachDate).toLowerCase();
            const addedDate = formatDate(breach.AddedDate).toLowerCase();
            
            return (
                breach.Title.toLowerCase().includes(searchText) ||
                breach.Description.toLowerCase().includes(searchText) ||
                breach.DataClasses.some(data => data.toLowerCase().includes(searchText)) ||
                breachDate.includes(searchText) ||
                addedDate.includes(searchText)
            );
        });

        // Then sort
        return [...filtered].sort((a, b) => {
            let aValue = a[sortField];
            let bValue = b[sortField];

            if (sortField.includes('Date')) {
                aValue = new Date(aValue).getTime();
                bValue = new Date(bValue).getTime();
            }

            if (sortField === 'PwnCount') {
                aValue = Number(aValue);
                bValue = Number(bValue);
            }

            const compareResult = aValue > bValue ? 1 : -1;
            return sortOrder === 'asc' ? compareResult : -compareResult;
        });
    }, [searchQuery, sortField, sortOrder]);

    useEffect(() => {
        setDisplayedBreaches(filteredAndSortedBreaches.slice(0, page * itemsPerPage));
        setIsLoading(false);
    }, [filteredAndSortedBreaches, page]);

    const handleSearch = () => {
        setIsLoading(true);
        setSearchQuery(searchInput);
        setPage(1);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const loadMore = () => {
        setIsLoading(true);
        setPage(prev => prev + 1);
    };

    return (
        <Box sx={{ 
            p: 3,
            minHeight: '100vh',
            backgroundColor: theme.palette.background.default
        }}>
            {/* Header */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ 
                    fontWeight: 'bold', 
                    color: theme.palette.primary.main,
                    mb: 1
                }}>
                    Who Have Been Pwned
                </Typography>
                
                <Typography variant="caption" sx={{ 
                    display: 'block', 
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                    fontStyle: 'italic',
                    mb: 3
                }}>
                    Data sourced from{' '}
                    <Link 
                        href="https://haveibeenpwned.com/PwnedWebsites" 
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: 'inherit' }}
                    >
                        haveibeenpwned.com
                    </Link>
                </Typography>

                {/* Search Bar */}
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    mb: 4 
                }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search by title, description, dates, or compromised data type..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        sx={{
                            maxWidth: '600px',
                            backgroundColor: theme.palette.mode === 'dark' 
                                ? 'rgba(255, 255, 255, 0.05)' 
                                : 'rgba(255, 255, 255, 0.9)',
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSearch}
                        sx={{ height: '56px', px: 4 }}
                    >
                        Search
                    </Button>
                </Box>

                {/* Sort Controls */}
                <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    mb: 4
                }}>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={sortField}
                            onChange={(e) => setSortField(e.target.value)}
                            label="Sort By"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SortIcon />
                                </InputAdornment>
                            }
                        >
                            {sortOptions.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <ToggleButtonGroup
                        value={sortOrder}
                        exclusive
                        onChange={(_, newOrder) => newOrder && setSortOrder(newOrder)}
                        aria-label="sort order"
                    >
                        <ToggleButton value="asc" aria-label="ascending">
                            <ArrowUpwardIcon /> ASC
                        </ToggleButton>
                        <ToggleButton value="desc" aria-label="descending">
                            <ArrowDownwardIcon /> DESC
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                {/* Results Count */}
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Found {filteredAndSortedBreaches.length} results • Sorted by {
                        sortOptions.find(opt => opt.value === sortField)?.label
                    } ({sortOrder.toUpperCase()})
                </Typography>
            </Box>

            {/* Breach Cards */}
            <Grid container spacing={3}>
                {displayedBreaches.map((breach) => (
                    <Grid item xs={12} key={breach.Name}>
                        <Card sx={{ 
                            display: 'flex',
                            backgroundColor: theme.palette.mode === 'dark' 
                                ? 'rgba(255, 255, 255, 0.05)' 
                                : 'rgba(255, 255, 255, 0.9)',
                        }}>
                            <Box sx={{ 
                                width: 200,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 2
                            }}>
                                <img 
                                    src={breach.LogoPath} 
                                    alt={`${breach.Title} logo`}
                                    style={{ 
                                        maxWidth: '100%',
                                        maxHeight: 100,
                                        objectFit: 'contain'
                                    }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </Box>
                            <CardContent sx={{ flex: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    {breach.Title}
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    paragraph
                                    dangerouslySetInnerHTML={{ __html: breach.Description }}
                                />
                                <Typography variant="body2" component="div">
                                    <strong>Breach date:</strong> {formatDate(breach.BreachDate)}<br />
                                    <strong>Date added to HIBP:</strong> {formatDate(breach.AddedDate)}<br />
                                    <strong>Compromised accounts:</strong> {breach.PwnCount.toLocaleString()}<br />
                                    <strong>Compromised data:</strong> {breach.DataClasses.join(', ')}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Load More Button */}
            {displayedBreaches.length < filteredAndSortedBreaches.length && (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button
                        variant="outlined"
                        onClick={loadMore}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Load More'}
                    </Button>
                </Box>
            )}
        </Box>
    );
}

export default WhoHaveBeenPwned; 