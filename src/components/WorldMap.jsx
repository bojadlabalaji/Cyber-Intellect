import React, { useState, useMemo } from 'react';
import { Box, Typography, useTheme, Grid } from '@mui/material';
import { Mercator } from '@visx/geo';
import { scaleQuantize } from '@visx/scale';
import { Tooltip } from '@visx/tooltip';
import topology from '../data/world-topo.json';
import { feature } from 'topojson-client';
import countryCategories from '../data/latest_country_category_counts.json';
import useAttackDataStore from '../store/attackDataStore';

const world = feature(topology, topology.objects.countries);

// Define color scale outside the component
const colorScale = scaleQuantize({
  domain: [0, 50],
  range: [
    'rgba(13, 71, 161, 0.6)',
    'rgba(25, 118, 210, 0.6)', 
    'rgba(33, 150, 243, 0.6)',
    'rgba(66, 165, 245, 0.6)',
    'rgba(100, 181, 246, 0.6)'
  ]
});

// Country name mapping
const COUNTRY_NAME_MAPPING = {
  "United States of America": "United States",
  "USA": "United States",
  "Russian Federation": "Russia",
  "Czech Republic": "Czechia",
  "Korea, Republic of": "South Korea",
  "Iran, Islamic Republic of": "Iran",
  "Syrian Arab Republic": "Syria",
  "Viet Nam": "Vietnam",
  "Congo": "Congo, the Democratic Republic of the",
  "Tanzania": "United Republic of Tanzania",
  "Burma": "Myanmar",
  "Brunei": "Brunei Darussalam",
  "Dominican Rep.": "Dominican Republic",
  "Central African Rep.": "Central African Republic",
  "Dem. Rep. Korea": "North Korea",
  "Lao PDR": "Laos",
  "W. Sahara": "Western Sahara",
  "Bosnia and Herz.": "Bosnia and Herzegovina",
  "United Kingdom": "United Kingdom",
  "Vatican": "Holy See (Vatican City State)",
  "UAE": "United Arab Emirates",
};

const WorldMap = ({ width = 800, height = 500 }) => {
  const theme = useTheme();
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipLeft, setTooltipLeft] = useState(0);
  const [tooltipTop, setTooltipTop] = useState(0);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const { selectedCountry, setSelectedCountry } = useAttackDataStore();

  // Helper functions
  const getNormalizedCountryName = (name) => {
    return COUNTRY_NAME_MAPPING[name] || name;
  };

  const calculateTotalAttacks = (categories) => {
    return Object.values(categories).reduce((sum, count) => sum + count, 0);
  };

  // Precompute colors for all countries
  const countryColors = useMemo(() => {
    const colors = {};
    world.features.forEach((feature) => {
      const normalizedName = getNormalizedCountryName(feature.properties.name);
      const countryData = countryCategories[normalizedName];
      
      if (countryData) {
        const totalAttacks = calculateTotalAttacks(countryData);
        colors[normalizedName] = colorScale(totalAttacks);
      } else {
        colors[normalizedName] = 'rgba(255, 255, 255, 0.1)';
      }
    });
    return colors;
  }, []);

  const handleMouseMove = (event, countryStats, normalizedName) => {
    if (countryStats) {
      const totalAttacks = calculateTotalAttacks(countryStats);
      setHoveredCountry(normalizedName);
      
      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Get tooltip dimensions (approximate if not rendered yet)
      const tooltipWidth = 250; // minimum width of tooltip
      const tooltipHeight = 200; // approximate height
      
      // Calculate position
      let x = event.clientX;
      let y = viewportHeight / 2; // Vertical center
      
      // Adjust horizontal position if too close to right edge
      if (x + tooltipWidth + 20 > viewportWidth) {
        x = x - tooltipWidth - 20; // Place tooltip to the left of cursor
      } else {
        x = x + 20; // Place tooltip to the right of cursor
      }
      
      // Ensure tooltip stays within viewport bounds
      x = Math.max(10, Math.min(x, viewportWidth - tooltipWidth - 10));
      y = Math.max(10, Math.min(y, viewportHeight - tooltipHeight - 10));

      setTooltipLeft(x);
      setTooltipTop(y);
      
      setTooltipData({
        country: normalizedName,
        totalAttacks,
        categories: Object.entries(countryStats).map(([category, count]) => ({
          category,
          count
        }))
      });
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={theme.palette.mode === 'dark' ? '#0a1929' : '#ffffff'}
          rx={14}
        />
        <Mercator
          data={world.features}
          scale={width / 6}
          translate={[width / 2, height / 1.5]}
        >
          {(mercator) => (
            <g>
              {mercator.features.map(({ feature, path }, i) => {
                const normalizedName = getNormalizedCountryName(feature.properties.name);
                const countryStats = countryCategories[normalizedName];
                const fillColor = countryStats ? countryColors[normalizedName] : 'rgba(255, 255, 255, 0.1)';

                return (
                  <path
                    key={`country-${i}`}
                    d={path || ''}
                    fill={hoveredCountry === normalizedName ? 'rgba(255, 0, 0, 0.5)' : fillColor}
                    stroke={theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}
                    strokeWidth={0.5}
                    onMouseMove={(event) => handleMouseMove(event, countryStats, normalizedName)}
                    onMouseLeave={() => {
                      setHoveredCountry(null);
                      setTooltipData(null);
                    }}
                    style={{
                      cursor: countryStats ? 'pointer' : 'default',
                      transition: 'fill 0.2s ease-in-out',
                    }}
                  />
                );
              })}
            </g>
          )}
        </Mercator>
      </svg>

      {tooltipData && (
        <Tooltip
          left={tooltipLeft}
          top={tooltipTop}
          style={{
            position: 'fixed',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            borderRadius: '8px',
            padding: '12px',
            color: 'white',
            fontSize: '14px',
            pointerEvents: 'none',
            minWidth: '250px',
            maxWidth: '350px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-50%)',
            zIndex: 1000,
            transition: 'all 0.1s ease-out',
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            {tooltipData.country}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Most Recent Incidents: {tooltipData.totalAttacks}
          </Typography>
          
          {tooltipData.categories.map(({ category, count }, index) => (
            <Box 
              key={index} 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 0.5
              }}
            >
              <Typography variant="caption" sx={{ flex: 1 }}>
                • {category}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  px: 1,
                  borderRadius: 1,
                  ml: 2
                }}
              >
                {count}
              </Typography>
            </Box>
          ))}
        </Tooltip>
      )}
    </Box>
  );
};

export default WorldMap;
