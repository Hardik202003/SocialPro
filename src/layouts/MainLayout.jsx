import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  CssBaseline, 
  Divider, 
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  Typography,
  Avatar,
  Badge,
  Tooltip,
  useTheme,
  alpha
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  BarChart as AnalyticsIcon,
  Schedule as ScheduleIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const drawerWidth = 280;

const MainLayout = ({ toggleColorMode, mode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
    { text: 'Scheduler', icon: <ScheduleIcon />, path: '/scheduler' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const drawer = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: theme.palette.mode === 'dark' 
        ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.9)} 100%)` 
        : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.9)} 100%)`,
      backdropFilter: 'blur(10px)',
    }}>
      <Toolbar sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        py: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar 
            sx={{ 
              background: `linear-gradient(135deg, #F6E27A 0%, #D4AF37 50%, #AA771C 100%)`,
              width: 40, 
              height: 40,
              boxShadow: `0 4px 8px ${alpha('#AA771C', 0.5)}`,
              border: `2px solid ${alpha(theme.palette.background.paper, 0.9)}`,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '15%',
                left: '15%',
                width: '20%',
                height: '20%',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.7)',
                filter: 'blur(1px)'
              },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'serif',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              color: 'white',
              textShadow: '0px 1px 2px rgba(0,0,0,0.2)'
            }}
          >
            S
          </Avatar>
          <Typography 
            variant="h5" 
            fontWeight="bold" 
            component="div"
            sx={{
              background: `linear-gradient(135deg, #F6E27A 0%, #D4AF37 50%, #AA771C 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.5px',
              textShadow: '0px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            SocialPro
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <Box sx={{ px: 2, py: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2, 
          mb: 3,
          p: 2,
          borderRadius: 2,
          bgcolor: alpha(theme.palette.primary.main, 0.1),
        }}>
          <Avatar 
            src="https://ui-avatars.com/api/?name=HK&background=0D8ABC&color=fff&bold=true" 
            sx={{ width: 48, height: 48 }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Hardik Suvan
            </Typography>
            <Typography variant="body2" color="text.secondary">
              CS
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ mx: 2, mb: 2 }} />
      <Typography 
        variant="overline" 
        color="text.secondary" 
        sx={{ px: 3, mb: 1, display: 'block', fontWeight: 'bold' }}
      >
        MAIN MENU
      </Typography>
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton 
              component={Link} 
              to={item.path}
              selected={location.pathname === item.path}
              sx={{ 
                borderRadius: 2,
                py: 1.5,
                '&.Mui-selected': {
                  bgcolor: theme.palette.mode === 'dark' 
                    ? alpha(theme.palette.primary.main, 0.2)
                    : alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark' 
                      ? alpha(theme.palette.primary.main, 0.3)
                      : alpha(theme.palette.primary.main, 0.2),
                  },
                  '& .MuiListItemIcon-root': {
                    color: theme.palette.primary.main,
                  }
                },
                '&:hover': {
                  bgcolor: theme.palette.mode === 'dark' 
                    ? alpha(theme.palette.primary.main, 0.1)
                    : alpha(theme.palette.primary.main, 0.05),
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
              {item.path === location.pathname && (
                <Box 
                  sx={{ 
                    width: 4, 
                    height: 32, 
                    bgcolor: theme.palette.primary.main,
                    borderRadius: 4,
                    ml: 1
                  }} 
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2, mt: 2 }}>
        <Box sx={{ 
          p: 2, 
          borderRadius: 2, 
          bgcolor: theme.palette.mode === 'dark' 
            ? alpha(theme.palette.primary.main, 0.1)
            : alpha(theme.palette.primary.main, 0.05),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1
        }}>
          <Typography variant="subtitle2" align="center" fontWeight="bold">
            Need help with your campaigns?
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 1 }}>
            Contact our support team
          </Typography>
          <Box 
            component="button"
            sx={{ 
              border: 'none',
              bgcolor: theme.palette.primary.main,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              color: 'white',
              py: 1,
              px: 3,
              borderRadius: 2,
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%',
              '&:hover': {
                opacity: 0.9
              }
            }}
          >
            Contact Support
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: theme.palette.mode === 'dark' 
            ? alpha(theme.palette.background.paper, 0.8)
            : alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(10px)',
          boxShadow: theme.palette.mode === 'dark' 
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)'
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" color="text.primary" fontWeight="bold">
              {menuItems.find(item => item.path === location.pathname)?.text || 'Social Media Dashboard'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                bgcolor: theme.palette.mode === 'dark' 
                  ? alpha(theme.palette.common.white, 0.05)
                  : alpha(theme.palette.common.black, 0.05),
                borderRadius: 2,
                px: 2,
                py: 0.5,
                mr: 2,
                border: `1px solid ${alpha('#D4AF37', 0.2)}`,
                '&:hover': {
                  boxShadow: `0 0 0 2px ${alpha('#D4AF37', 0.2)}`
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  bgcolor: alpha('#D4AF37', 0.2),
                  color: '#D4AF37',
                  mr: 1
                }}
              >
                <SearchIcon sx={{ fontSize: 16 }} />
              </Box>
              <input 
                placeholder="Search SocialPro..." 
                style={{ 
                  border: 'none', 
                  outline: 'none', 
                  background: 'transparent',
                  color: theme.palette.text.primary,
                  width: 150,
                  fontSize: '0.875rem'
                }} 
              />
            </Box>
            <Tooltip title="Notifications">
              <IconButton color="inherit">
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title={theme.palette.mode === 'dark' ? 'Light Mode' : 'Dark Mode'}>
              <IconButton onClick={toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile">
              <IconButton sx={{ ml: 1 }}>
                <Avatar 
                  src="https://ui-avatars.com/api/?name=HK&background=0D8ABC&color=fff&bold=true" 
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: 'none',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: 'none',
              boxShadow: theme.palette.mode === 'dark' 
                ? '4px 0 15px rgba(0, 0, 0, 0.2)'
                : '4px 0 15px rgba(0, 0, 0, 0.05)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          bgcolor: theme.palette.background.default
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout; 