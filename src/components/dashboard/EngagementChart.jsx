import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, useTheme, alpha, Grid, Chip } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendingUp as TrendingUpIcon } from '@mui/icons-material';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const EngagementChart = ({ data, title }) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [activeDataset, setActiveDataset] = useState(null);

  useEffect(() => {
    if (data) {
      const labels = Array.from({ length: 14 }, (_, i) => `Day ${i + 1}`);
      
      const datasets = Object.keys(data).map((platform, index) => {
        const colors = [
          { borderColor: 'rgb(53, 162, 235)', backgroundColor: 'rgba(53, 162, 235, 0.5)' },
          { borderColor: 'rgb(255, 99, 132)', backgroundColor: 'rgba(255, 99, 132, 0.5)' },
          { borderColor: 'rgb(75, 192, 192)', backgroundColor: 'rgba(75, 192, 192, 0.5)' },
          { borderColor: 'rgb(255, 159, 64)', backgroundColor: 'rgba(255, 159, 64, 0.5)' },
        ];
        
        return {
          label: platform.charAt(0).toUpperCase() + platform.slice(1),
          data: data[platform].dailyStats,
          borderColor: colors[index % colors.length].borderColor,
          backgroundColor: colors[index % colors.length].backgroundColor,
          tension: 0.4,
          borderWidth: activeDataset === platform ? 3 : 2,
          pointRadius: activeDataset === platform ? 5 : 3,
          pointBackgroundColor: colors[index % colors.length].borderColor,
          pointBorderColor: theme.palette.background.paper,
          pointBorderWidth: 2,
          pointHoverRadius: 6,
          pointHoverBorderWidth: 3,
          fill: activeDataset === platform ? 'origin' : false,
          order: activeDataset === platform ? 0 : index + 1,
        };
      });

      setChartData({
        labels,
        datasets,
      });
    }
  }, [data, activeDataset, theme]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: theme.palette.mode === 'dark' 
          ? alpha(theme.palette.background.paper, 0.9)
          : alpha(theme.palette.background.paper, 0.9),
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        titleFont: {
          weight: 'bold',
        },
        callbacks: {
          labelTextColor: (context) => {
            return context.dataset.borderColor;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: theme.palette.mode === 'dark' 
            ? alpha(theme.palette.divider, 0.1)
            : alpha(theme.palette.divider, 0.5),
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          padding: 10,
        }
      },
    },
    elements: {
      line: {
        borderJoinStyle: 'round',
      },
    },
  };

  const handleDatasetToggle = (platform) => {
    setActiveDataset(activeDataset === platform ? null : platform);
  };

  // Calculate total engagement
  const calculateTotalEngagement = () => {
    if (!data) return 0;
    return Object.keys(data).reduce((total, platform) => {
      return total + data[platform].engagement;
    }, 0).toFixed(1);
  };

  // Find platform with highest engagement
  const findHighestEngagement = () => {
    if (!data) return { platform: '', value: 0 };
    
    let highest = { platform: '', value: 0 };
    Object.keys(data).forEach(platform => {
      if (data[platform].engagement > highest.value) {
        highest = { platform, value: data[platform].engagement };
      }
    });
    
    return highest;
  };

  const highestEngagement = findHighestEngagement();

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: theme.palette.mode === 'dark' 
          ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)' 
          : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 0 }}>
        <Box sx={{ p: 3, pb: 0 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Typography 
                variant="h6" 
                component="div" 
                color="text.primary" 
                sx={{ fontWeight: 'bold' }}
              >
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average engagement rate: {calculateTotalEngagement()}%
              </Typography>
            </Grid>
            <Grid item>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  bgcolor: alpha(theme.palette.success.main, 0.1),
                  color: theme.palette.success.main,
                  borderRadius: 2,
                  px: 1.5,
                  py: 0.75,
                }}
              >
                <TrendingUpIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
                <Typography variant="caption" fontWeight="bold">
                  {highestEngagement.platform.charAt(0).toUpperCase() + highestEngagement.platform.slice(1)} leads with {highestEngagement.value}%
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
            {data && Object.keys(data).map((platform, index) => {
              const colors = [
                'primary', 'error', 'success', 'warning'
              ];
              
              return (
                <Chip
                  key={platform}
                  label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                  color={colors[index % colors.length]}
                  variant={activeDataset === platform ? 'filled' : 'outlined'}
                  onClick={() => handleDatasetToggle(platform)}
                  sx={{ 
                    fontWeight: 'medium',
                    '&:hover': {
                      opacity: 0.9,
                    }
                  }}
                />
              );
            })}
          </Box>
        </Box>
        
        <Box sx={{ height: 350, p: 3, pt: 2 }}>
          <Line options={options} data={chartData} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default EngagementChart; 