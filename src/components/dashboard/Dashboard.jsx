import { useState, useEffect } from 'react';
import { Grid, Typography, Box, CircularProgress, Paper, useTheme, alpha, Divider, Chip, Avatar } from '@mui/material';
import { 
  Facebook as FacebookIcon, 
  Twitter as TwitterIcon, 
  Instagram as InstagramIcon, 
  LinkedIn as LinkedInIcon,
  ArrowUpward as ArrowUpwardIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import StatCard from './StatCard';
import EngagementChart from './EngagementChart';
import { fetchSocialMediaStats, MOCK_SOCIAL_MEDIA_STATS } from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const getStats = async () => {
      try {
        setLoading(true);
        const data = await fetchSocialMediaStats();
        setStats(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch social media statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  // Calculate total followers
  const totalFollowers = stats ? 
    stats.facebook.followers + 
    stats.twitter.followers + 
    stats.instagram.followers + 
    stats.linkedin.followers : 0;

  // Calculate total engagement
  const totalEngagement = stats ? 
    (stats.facebook.engagement + 
    stats.twitter.engagement + 
    stats.instagram.engagement + 
    stats.linkedin.engagement).toFixed(1) : 0;

  // Calculate total posts
  const totalPosts = stats ? 
    stats.facebook.posts + 
    stats.twitter.tweets + 
    stats.instagram.posts + 
    stats.linkedin.posts : 0;

  return (
    <Box>
      {/* Header Section */}
      <Box 
        sx={{ 
          mb: 4,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: 2
        }}
      >
        <Box>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 'bold',
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            Social Media Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Overview of your social media performance across platforms
          </Typography>
        </Box>
        
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 2,
            flexWrap: 'wrap',
            alignItems: 'center'
          }}
        >
          <Chip 
            icon={<TrendingUpIcon />} 
            label={`${totalFollowers.toLocaleString()} Total Followers`} 
            color="primary" 
            sx={{ 
              fontWeight: 'bold', 
              px: 1,
              '& .MuiChip-icon': { color: 'inherit' }
            }} 
          />
          
          <Paper 
            sx={{ 
              py: 1, 
              px: 2, 
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              boxShadow: theme.palette.mode === 'dark' 
                ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)' 
                : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Last updated:
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {new Date().toLocaleDateString()}
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 4,
          background: theme.palette.mode === 'dark' 
            ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.05)} 0%, ${alpha(theme.palette.background.paper, 0.7)} 100%)` 
            : `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box 
            sx={{ 
              width: 40, 
              height: 40, 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              mr: 2
            }}
          >
            <TrendingUpIcon sx={{ color: 'white' }} />
          </Box>
          <Typography variant="h6" fontWeight="bold">
            Performance Overview
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              p: 2, 
              borderRadius: 3, 
              bgcolor: alpha(theme.palette.background.paper, 0.6),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Total Followers
              </Typography>
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                {totalFollowers.toLocaleString()}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    color: theme.palette.success.main,
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ArrowUpwardIcon sx={{ fontSize: '0.875rem', mr: 0.5 }} /> 12.5%
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  vs last month
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              p: 2, 
              borderRadius: 3, 
              bgcolor: alpha(theme.palette.background.paper, 0.6),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Engagement Rate
              </Typography>
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                {totalEngagement}%
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    color: theme.palette.success.main,
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ArrowUpwardIcon sx={{ fontSize: '0.875rem', mr: 0.5 }} /> 3.2%
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  vs last month
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              p: 2, 
              borderRadius: 3, 
              bgcolor: alpha(theme.palette.background.paper, 0.6),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Total Posts
              </Typography>
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                {totalPosts}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    color: theme.palette.success.main,
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ArrowUpwardIcon sx={{ fontSize: '0.875rem', mr: 0.5 }} /> 8.7%
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  vs last month
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Platform Stats */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
        Platform Performance
      </Typography>
      
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Facebook Followers" 
            value={stats?.facebook.followers.toLocaleString()} 
            icon={<FacebookIcon />} 
            color="primary" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Twitter Followers" 
            value={stats?.twitter.followers.toLocaleString()} 
            icon={<TwitterIcon />} 
            color="info" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Instagram Followers" 
            value={stats?.instagram.followers.toLocaleString()} 
            icon={<InstagramIcon />} 
            color="secondary" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="LinkedIn Followers" 
            value={stats?.linkedin.followers.toLocaleString()} 
            icon={<LinkedInIcon />} 
            color="success" 
          />
        </Grid>
      </Grid>

      {/* Engagement Analytics */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box 
            sx={{ 
              width: 40, 
              height: 40, 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
              mr: 2
            }}
          >
            <TrendingUpIcon sx={{ color: 'white' }} />
          </Box>
          <Typography variant="h6" fontWeight="bold">
            Engagement Analytics
          </Typography>
        </Box>
        
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            borderRadius: 4,
            background: theme.palette.mode === 'dark' 
              ? alpha(theme.palette.background.paper, 0.8)
              : alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <EngagementChart 
            data={stats?.engagementData?.datasets || []} 
            title="Engagement over the last 14 days" 
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard; 