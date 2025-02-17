import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';

function Timeline() {
  const theme = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const stages = [
    {
        "title": "Project Planning",
        "date": "Sep 20th - Sep 27th",
        "description": "Outlined project objectives, assigned tasks among team members, and created a timeline for completion.",
        "status": "completed",
        "milestones": ["Objective definition", "Task assignments", "Timeline creation"]
    },
    {
        "title": "Data Collection",
        "date": "Sep 28th - Oct 11th",
        "description": "Gathered required data and resources, and prepared the system design and basic UI mockups.",
        "status": "completed",
        "milestones": ["Data gathering", "System design", "UI mockups"]
    },
    {
        "title": "Frontend Development",
        "date": "Oct 12th - Nov 2nd",
        "description": "Built the user interface for the project and ensured basic functionality.",
        "status": "completed",
        "milestones": ["Frontend setup", "UI development", "Basic functionality implementation"]
    },
    {
        "title": "Backend Development and Integration",
        "date": "Nov 5th - Nov 22nd",
        "description": "Developed backend features, connected them with the frontend, and tested the overall flow.",
        "status": "completed",
        "milestones": ["Backend development", "Frontend-backend connection", "Flow testing"]
    },
    {
        "title": "Deployment",
        "date": "Dec 5th",
        "description": "Finalized the project, prepared the presentation, and submitted it for evaluation.",
        "status": "upcoming",
        "milestones": ["Final touches", "Presentation preparation", "Submission"]
    }
];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return theme.palette.primary.main;
      case 'current':
        return theme.palette.secondary.main;
      default:
        return theme.palette.text.disabled;
    }
  };

  const getBlockColor = (index) => {
    const colors = theme.palette.mode === 'dark' 
      ? [
          'rgba(19, 47, 76, 0.4)',
          'rgba(76, 29, 76, 0.4)',
          'rgba(47, 76, 29, 0.4)',
          'rgba(76, 47, 19, 0.4)',
          'rgba(29, 47, 76, 0.4)'
        ]
      : [
          'rgba(237, 242, 247, 0.9)',
          'rgba(254, 242, 242, 0.9)',
          'rgba(240, 253, 244, 0.9)',
          'rgba(254, 243, 199, 0.9)',
          'rgba(239, 246, 255, 0.9)'
        ];
    return colors[index % colors.length];
  };

  return (
    <Box sx={{ p: 4, maxWidth: '100vw', overflow: 'hidden' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 6, 
            textAlign: 'center',
            fontWeight: 'bold',
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #00a0fc, #0062ff)'
              : 'linear-gradient(45deg, #2563eb, #1e40af)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Project Timeline
        </Typography>
      </motion.div>

      <Box 
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            left: '50.6%',
            top: '24px',
            bottom: '24px',
            width: '2px',
            transformOrigin: 'top',
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(to bottom, rgba(0,160,252,0.3), rgba(0,98,255,0.3))'
              : 'linear-gradient(to bottom, rgba(37,99,235,0.2), rgba(30,64,175,0.2))',
          }}
        />

        {stages.map((stage, index) => (
          <motion.div
            key={stage.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.2 }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                paddingLeft: index % 2 === 0 ? '50%' : '0',
                paddingRight: index % 2 === 0 ? '0' : '50%',
                position: 'relative',
              }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 45 }}
                transition={{ delay: 1 + index * 0.2, duration: 0.3 }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop: '24px',
                  zIndex: 2,
                }}
              >
                <Box
                  sx={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: getStatusColor(stage.status),
                    border: `2px solid ${theme.palette.background.paper}`,
                    transition: 'all 0.3s ease',
                    transform: hoveredIndex === index ? 'scale(1.3)' : 'scale(1)',
                  }}
                />
              </motion.div>

              <Box
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                sx={{
                  width: '92%',
                  p: 3,
                  borderRadius: 2,
                  background: getBlockColor(index),
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.3s ease',
                  transform: hoveredIndex === index 
                    ? `translateX(${index % 2 === 0 ? '-' : ''}10px)` 
                    : 'translateX(0)',
                  border: `1px solid ${theme.palette.divider}`,
                  ml: index % 2 === 0 ? 4 : 0,
                  mr: index % 2 === 0 ? 0 : 4,
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 0 20px rgba(0, 160, 252, 0.2)'
                      : '0 0 20px rgba(37, 99, 235, 0.1)',
                  }
                }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: getStatusColor(stage.status),
                    fontWeight: 'bold',
                  }}
                >
                  {stage.date}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    color: theme.palette.text.primary,
                    fontWeight: 'bold',
                  }}
                >
                  {stage.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 2,
                  }}
                >
                  {stage.description}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {stage.milestones.map((milestone) => (
                    <Typography
                      key={milestone}
                      variant="caption"
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(0, 0, 0, 0.05)',
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {milestone}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}

export default Timeline;
