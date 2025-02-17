import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Link,
    Chip,
    TextField,
    InputAdornment,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
    Tooltip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import SecurityIcon from '@mui/icons-material/Security';
import WarningIcon from '@mui/icons-material/Warning';
import PublicIcon from '@mui/icons-material/Public';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import TableChartIcon from '@mui/icons-material/TableChart';


const resourcesData = {
    "resources": [
        {
            "id": 1,
            "name": "AbuseIPDB",
            "description": "Check and report abusive IP addresses. A project dedicated to helping combat the spread of hackers, spammers, and abusive activity on the internet.",
            "url": "https://www.abuseipdb.com",
            "category": "IP Intelligence",
            "icon": "security",
            "usedIn": ["IP Abuse Check"]
        },
        {
            "id": 2,
            "name": "Have I Been Pwned",
            "description": "Check if your email or phone is in a data breach. A free resource for anyone to quickly assess if they may have been put at risk due to an online account having been compromised or 'pwned' in a data breach.",
            "url": "https://haveibeenpwned.com",
            "category": "Data Breach",
            "icon": "warning",
            "usedIn": ["Who Have Been Pwned"]
        },
        {
            "id": 3,
            "name": "Check Point ThreatMap",
            "description": "Live cyber threat map showing real-time cyber attacks. Visualize cyber attacks happening around the world in real-time.",
            "url": "https://threatmap.checkpoint.com",
            "category": "Threat Intelligence",
            "icon": "public",
            "usedIn": ["Live Threat Feed"]
        },
        {
            "id": 4,
            "name": "European Repository of Cyber Incidents (EuRepoC)",
            "description": "EuRepoC is an independent research group analyzing cyber incidents to enhance understanding of the cyber threat landscape. They provide reliable, user-specific data from an interdisciplinary perspective.",
            "url": "https://eurepoc.eu/table-view/",
            "category": "Cyber Incidents",
            "icon": "tableChart",
            "usedIn": ["Cyber Incident Analysis"]
        }
    ],
    "categories": [
        "IP Intelligence",
        "Data Breach",
        "Threat Intelligence",
        "Security Tools",
        "Documentation"
    ]
}

// Icon mapping
const iconMapping = {
    security: SecurityIcon,
    warning: WarningIcon,
    public: PublicIcon,
};

function Resources() {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Filter resources based on search and category
    const filteredResources = resourcesData.resources.filter(resource => {
        const matchesSearch = (
            resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <Box sx={{ p: 3, minHeight: '89vh' }}>
            {/* Header */}
            <Typography 
                variant="h4" 
                sx={{ 
                    textAlign: 'center',
                    mb: 1,
                    fontWeight: 'bold',
                    color: theme.palette.primary.main
                }}
            >
                Security Resources
            </Typography>
            <Typography 
                variant="body1" 
                sx={{ 
                    textAlign: 'center',
                    mb: 4,
                    color: theme.palette.text.secondary
                }}
            >
                Collection of cybersecurity tools and resources used in our platform
            </Typography>

            {/* Search and Filter */}
            <Box sx={{ 
                display: 'flex',
                gap: 2,
                mb: 4,
                justifyContent: 'center'
            }}>
                <TextField
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ width: '400px' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        label="Category"
                    >
                        <MenuItem value="all">All Categories</MenuItem>
                        {resourcesData.categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* Resources Grid */}
            <Grid container spacing={3}>
                {filteredResources.map((resource) => {
                    const IconComponent = iconMapping[resource.icon] || SecurityIcon;
                    
                    return (
                        <Grid item xs={12} md={6} key={resource.id}>
                            <Card sx={{
                                height: '100%',
                                backgroundColor: theme.palette.mode === 'dark' 
                                    ? 'rgba(255, 255, 255, 0.05)' 
                                    : 'rgba(255, 255, 255, 0.9)',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)'
                                }
                            }}>
                                <CardContent>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        mb: 2
                                    }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <IconComponent color="primary" />
                                            <Typography variant="h6">
                                                {resource.name}
                                            </Typography>
                                        </Box>
                                        <Tooltip title="Visit website">
                                            <IconButton 
                                                component={Link}
                                                href={resource.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <OpenInNewIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                    
                                    <Typography 
                                        variant="body2" 
                                        color="text.secondary"
                                        sx={{ mb: 2 }}
                                    >
                                        {resource.description}
                                    </Typography>

                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        <Chip 
                                            label={resource.category}
                                            color="primary"
                                            size="small"
                                        />
                                        {resource.usedIn.map((usage) => (
                                            <Chip
                                                key={usage}
                                                label={`Used in: ${usage}`}
                                                variant="outlined"
                                                size="small"
                                            />
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {/* No Results Message */}
            {filteredResources.length === 0 && (
                <Typography 
                    variant="body1" 
                    sx={{ 
                        textAlign: 'center',
                        mt: 4,
                        color: theme.palette.text.secondary
                    }}
                >
                    No resources found matching your criteria
                </Typography>
            )}
        </Box>
    );
}

export default Resources;
