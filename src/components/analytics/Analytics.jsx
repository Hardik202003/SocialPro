import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Tabs, 
  Tab, 
  CircularProgress,
  Divider
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
} from 'chart.js';
import { Line, Bar, Pie, PolarArea } from 'react-chartjs-2';
import { fetchSocialMediaStats } from '../../services/api';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
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

  // Prepare data for charts
  const platforms = ['facebook', 'twitter', 'instagram', 'linkedin'];
  const platformNames = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'];
  const colors = [
    'rgba(59, 89, 152, 0.7)',  // Facebook blue
    'rgba(29, 161, 242, 0.7)', // Twitter blue
    'rgba(193, 53, 132, 0.7)', // Instagram pink
    'rgba(0, 119, 181, 0.7)'   // LinkedIn blue
  ];
  const borderColors = [
    'rgba(59, 89, 152, 1)',
    'rgba(29, 161, 242, 1)',
    'rgba(193, 53, 132, 1)',
    'rgba(0, 119, 181, 1)'
  ];

  // Followers data
  const followersData = {
    labels: platformNames,
    datasets: [
      {
        label: 'Followers',
        data: platforms.map(platform => stats[platform].followers),
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  // Engagement data
  const engagementData = {
    labels: platformNames,
    datasets: [
      {
        label: 'Engagement Rate (%)',
        data: platforms.map(platform => stats[platform].engagement),
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  // Interactions data
  const interactionsData = {
    labels: platformNames,
    datasets: [
      {
        label: 'Likes',
        data: platforms.map(platform => stats[platform].likes),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Comments',
        data: platforms.map(platform => stats[platform].comments || 0),
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
      {
        label: 'Shares/Retweets',
        data: platforms.map(platform => stats[platform].shares || stats[platform].retweets || 0),
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Daily stats data
  const dailyStatsData = {
    labels: Array.from({ length: 14 }, (_, i) => `Day ${i + 1}`),
    datasets: platforms.map((platform, index) => ({
      label: platformNames[index],
      data: stats[platform].dailyStats,
      borderColor: borderColors[index],
      backgroundColor: colors[index],
      tension: 0.3,
    })),
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Detailed analytics and insights for your social media platforms
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Overview" />
          <Tab label="Engagement" />
          <Tab label="Interactions" />
          <Tab label="Trends" />
        </Tabs>
      </Paper>

      {/* Overview Tab */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Followers Distribution</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box height={300}>
                <Pie 
                  data={followersData} 
                  options={{ 
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      }
                    }
                  }} 
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Engagement Rate</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box height={300}>
                <PolarArea 
                  data={engagementData} 
                  options={{ 
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      }
                    }
                  }} 
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Engagement Tab */}
      {activeTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Engagement Comparison</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box height={400}>
                <Bar 
                  data={engagementData} 
                  options={{ 
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Engagement Rate (%)'
                        }
                      }
                    }
                  }} 
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Interactions Tab */}
      {activeTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Interactions by Platform</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box height={400}>
                <Bar 
                  data={interactionsData} 
                  options={{ 
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Count'
                        }
                      }
                    }
                  }} 
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Trends Tab */}
      {activeTab === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Daily Engagement Trends</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box height={400}>
                <Line 
                  data={dailyStatsData} 
                  options={{ 
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Engagement'
                        }
                      }
                    }
                  }} 
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Analytics; 