import { Card, CardContent, Typography, Box, useTheme, alpha } from '@mui/material';

const StatCard = ({ title, value, icon, color }) => {
  const theme = useTheme();
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 4,
        boxShadow: theme.palette.mode === 'dark' 
          ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)' 
          : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: theme.palette.mode === 'dark' 
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)' 
            : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)',
        }
      }}
    >
      {/* Background decoration */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: -20, 
          right: -20, 
          width: 120, 
          height: 120, 
          borderRadius: '50%', 
          background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.2)} 0%, ${alpha(theme.palette[color].main, 0)} 70%)`,
          zIndex: 0
        }} 
      />
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: -30, 
          left: -30, 
          width: 160, 
          height: 160, 
          borderRadius: '50%', 
          background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.1)} 0%, ${alpha(theme.palette[color].main, 0)} 70%)`,
          zIndex: 0
        }} 
      />
      
      <CardContent sx={{ flexGrow: 1, position: 'relative', zIndex: 1, p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography 
            variant="subtitle1" 
            component="div" 
            color="text.secondary"
            sx={{ fontWeight: 600, fontSize: '0.9rem' }}
          >
            {title}
          </Typography>
          <Box sx={{ 
            backgroundColor: alpha(theme.palette[color].main, 0.15),
            color: theme.palette[color].main,
            borderRadius: '50%',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 0 8px ${alpha(theme.palette[color].main, 0.05)}`
          }}>
            {icon}
          </Box>
        </Box>
        <Typography 
          variant="h4" 
          component="div" 
          sx={{ 
            fontWeight: 700, 
            mb: 1,
            background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${alpha(theme.palette.text.primary, 0.7)} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {value}
        </Typography>
        
        {/* Add a subtle indicator */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: theme.palette.success.main,
              bgcolor: alpha(theme.palette.success.main, 0.1),
              borderRadius: 1,
              px: 1,
              py: 0.5,
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}
          >
            <Box component="span" sx={{ mr: 0.5 }}>↑</Box> 4.5%
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            vs last week
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard; 