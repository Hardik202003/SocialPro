import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  Switch, 
  FormControlLabel, 
  TextField, 
  Button, 
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  useTheme,
  alpha,
  Avatar,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Badge
} from '@mui/material';
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Language as LanguageIcon,
  AccessTime as TimeIcon,
  Notifications as NotificationsIcon,
  Email as EmailIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  CloudUpload as CloudUploadIcon,
  Security as SecurityIcon,
  Devices as DevicesIcon,
  Palette as PaletteIcon
} from '@mui/icons-material';

const Settings = ({ toggleColorMode, mode }) => {
  const theme = useTheme();
  
  const [settings, setSettings] = useState({
    darkMode: mode === 'dark',
    emailNotifications: true,
    pushNotifications: false,
    timezone: 'UTC',
    language: 'en',
    autoPost: false,
    email: 'hardik.suvan@example.com'
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    
    if (name === 'darkMode') {
      toggleColorMode();
    }
    
    setSettings(prev => ({
      ...prev,
      [name]: event.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    setSnackbar({
      open: true,
      message: 'Settings saved successfully!',
      severity: 'success'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const SettingCard = ({ title, icon, children }) => (
    <Card 
      sx={{ 
        height: '100%',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: theme.palette.mode === 'dark' 
          ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)' 
          : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)'
        }
      }}
    >
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center',
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          background: theme.palette.mode === 'dark' 
            ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.1)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)` 
            : `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
        }}
      >
        <Avatar 
          sx={{ 
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            mr: 2
          }}
        >
          {icon}
        </Avatar>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
      </Box>
      <CardContent sx={{ p: 3 }}>
        {children}
      </CardContent>
    </Card>
  );

  return (
    <Box>
      {/* Header */}
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
            Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure your dashboard preferences and notifications
          </Typography>
        </Box>
        
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{ 
            px: 3,
            py: 1,
            borderRadius: 2,
            boxShadow: theme.shadows[4]
          }}
        >
          Save Settings
        </Button>
      </Box>

      {/* Profile Section */}
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
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 3 }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <IconButton 
                size="small" 
                sx={{ 
                  bgcolor: theme.palette.background.paper,
                  boxShadow: theme.shadows[2],
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1)
                  }
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            }
          >
            <Avatar 
              src="https://ui-avatars.com/api/?name=HK&background=0D8ABC&color=fff&bold=true" 
              sx={{ width: 100, height: 100, boxShadow: theme.shadows[3] }}
            />
          </Badge>
          
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Hardik Suvan
            </Typography>
            <Typography variant="body1" color="text.secondary">
              CS
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Button 
                size="small" 
                variant="outlined" 
                startIcon={<EditIcon />}
                sx={{ borderRadius: 2 }}
              >
                Edit Profile
              </Button>
              <Button 
                size="small" 
                variant="outlined" 
                startIcon={<CloudUploadIcon />}
                sx={{ borderRadius: 2 }}
              >
                Upload Photo
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SettingCard title="Appearance" icon={<PaletteIcon />}>
            <FormControlLabel
              control={
                <Switch 
                  checked={settings.darkMode} 
                  onChange={handleChange} 
                  name="darkMode" 
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {settings.darkMode ? 
                    <LightModeIcon sx={{ mr: 1, color: theme.palette.warning.main }} /> : 
                    <DarkModeIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  }
                  <Typography>{settings.darkMode ? 'Dark Mode' : 'Light Mode'}</Typography>
                </Box>
              }
              sx={{ mb: 3, display: 'flex' }}
            />
            
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="language-label">Language</InputLabel>
              <Select
                labelId="language-label"
                name="language"
                value={settings.language}
                onChange={handleChange}
                label="Language"
                startAdornment={<LanguageIcon sx={{ mr: 1, ml: -0.5, color: theme.palette.primary.main }} />}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Spanish</MenuItem>
                <MenuItem value="fr">French</MenuItem>
                <MenuItem value="de">German</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="timezone-label">Timezone</InputLabel>
              <Select
                labelId="timezone-label"
                name="timezone"
                value={settings.timezone}
                onChange={handleChange}
                label="Timezone"
                startAdornment={<TimeIcon sx={{ mr: 1, ml: -0.5, color: theme.palette.primary.main }} />}
              >
                <MenuItem value="UTC">UTC</MenuItem>
                <MenuItem value="EST">Eastern Time (EST)</MenuItem>
                <MenuItem value="CST">Central Time (CST)</MenuItem>
                <MenuItem value="PST">Pacific Time (PST)</MenuItem>
                <MenuItem value="GMT">Greenwich Mean Time (GMT)</MenuItem>
              </Select>
            </FormControl>
          </SettingCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <SettingCard title="Notifications" icon={<NotificationsIcon />}>
            <FormControlLabel
              control={
                <Switch 
                  checked={settings.emailNotifications} 
                  onChange={handleChange} 
                  name="emailNotifications" 
                  color="primary"
                />
              }
              label="Email Notifications"
              sx={{ mb: 2, display: 'block' }}
            />
            
            <FormControlLabel
              control={
                <Switch 
                  checked={settings.pushNotifications} 
                  onChange={handleChange} 
                  name="pushNotifications" 
                  color="primary"
                />
              }
              label="Push Notifications"
              sx={{ mb: 2, display: 'block' }}
            />
            
            <FormControlLabel
              control={
                <Switch 
                  checked={settings.autoPost} 
                  onChange={handleChange} 
                  name="autoPost" 
                  color="primary"
                />
              }
              label="Auto-post scheduled content"
              sx={{ mb: 3, display: 'block' }}
            />
            
            <TextField
              fullWidth
              margin="normal"
              label="Email Address"
              name="email"
              type="email"
              value={settings.email}
              onChange={handleChange}
              variant="outlined"
              InputProps={{
                startAdornment: <EmailIcon sx={{ mr: 1, color: theme.palette.primary.main }} />,
              }}
            />
          </SettingCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <SettingCard title="Security" icon={<SecurityIcon />}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Two-Factor Authentication
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Add an extra layer of security to your account
              </Typography>
              <Button 
                variant="outlined" 
                color="primary"
                sx={{ borderRadius: 2 }}
              >
                Enable 2FA
              </Button>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Password
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Last changed 3 months ago
              </Typography>
              <Button 
                variant="outlined" 
                color="primary"
                sx={{ borderRadius: 2 }}
              >
                Change Password
              </Button>
            </Box>
          </SettingCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <SettingCard title="Connected Devices" icon={<DevicesIcon />}>
            {[
              { name: 'MacBook Pro', lastActive: 'Currently active', icon: '💻' },
              { name: 'iPhone 13', lastActive: '2 hours ago', icon: '📱' },
              { name: 'iPad Pro', lastActive: '3 days ago', icon: '📱' },
            ].map((device, index) => (
              <Box 
                key={index} 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 2,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.background.default, 0.6),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.05)
                  }
                }}
              >
                <Typography variant="h5" sx={{ mr: 2 }}>
                  {device.icon}
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2">
                    {device.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {device.lastActive}
                  </Typography>
                </Box>
                <Button 
                  size="small" 
                  color="error" 
                  variant="text"
                  sx={{ borderRadius: 2 }}
                >
                  Logout
                </Button>
              </Box>
            ))}
          </SettingCard>
        </Grid>
      </Grid>
      
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ 
            width: '100%',
            boxShadow: theme.shadows[3],
            borderRadius: 2
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings; 