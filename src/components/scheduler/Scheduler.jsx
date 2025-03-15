import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { format } from 'date-fns';
import { fetchScheduledPosts, createScheduledPost, deleteScheduledPost } from '../../services/api';

const Scheduler = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // Form state
  const [formData, setFormData] = useState({
    platform: '',
    content: '',
    scheduledDate: '',
    image: ''
  });

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await fetchScheduledPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch scheduled posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await createScheduledPost(formData);
      
      // Reset form
      setFormData({
        platform: '',
        content: '',
        scheduledDate: '',
        image: ''
      });
      
      // Reload posts
      await loadPosts();
      
      setSnackbar({
        open: true,
        message: 'Post scheduled successfully!',
        severity: 'success'
      });
    } catch (err) {
      setError('Failed to schedule post');
      setSnackbar({
        open: true,
        message: 'Failed to schedule post',
        severity: 'error'
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    try {
      setLoading(true);
      await deleteScheduledPost(postId);
      
      // Reload posts
      await loadPosts();
      
      setSnackbar({
        open: true,
        message: 'Post deleted successfully!',
        severity: 'success'
      });
    } catch (err) {
      setError('Failed to delete post');
      setSnackbar({
        open: true,
        message: 'Failed to delete post',
        severity: 'error'
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'PPP p');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Content Scheduler
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Schedule and manage your social media posts across platforms
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <AddIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Schedule New Post</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="platform-label">Platform</InputLabel>
                <Select
                  labelId="platform-label"
                  name="platform"
                  value={formData.platform}
                  onChange={handleInputChange}
                  label="Platform"
                  required
                >
                  <MenuItem value="facebook">Facebook</MenuItem>
                  <MenuItem value="twitter">Twitter</MenuItem>
                  <MenuItem value="instagram">Instagram</MenuItem>
                  <MenuItem value="linkedin">LinkedIn</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                fullWidth
                margin="normal"
                label="Content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                multiline
                rows={4}
                required
              />
              
              <TextField
                fullWidth
                margin="normal"
                label="Image URL (optional)"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
              />
              
              <TextField
                fullWidth
                margin="normal"
                label="Schedule Date"
                name="scheduledDate"
                type="datetime-local"
                value={formData.scheduledDate}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
              
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ mt: 3 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Schedule Post'}
              </Button>
            </form>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={7}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Scheduled Posts
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {loading && posts.length === 0 ? (
              <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress />
              </Box>
            ) : posts.length === 0 ? (
              <Typography color="text.secondary" align="center" p={3}>
                No scheduled posts yet
              </Typography>
            ) : (
              <List>
                {posts.map((post) => (
                  <ListItem 
                    key={post.id} 
                    alignItems="flex-start"
                    sx={{ 
                      mb: 2, 
                      border: '1px solid', 
                      borderColor: 'divider',
                      borderRadius: 1,
                      p: 2
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center">
                          <Typography variant="subtitle1" fontWeight="bold" sx={{ textTransform: 'capitalize' }}>
                            {post.platform}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                            {formatDate(post.scheduledDate)}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                            sx={{ display: 'inline', mt: 1 }}
                          >
                            {post.content}
                          </Typography>
                          {post.image && (
                            <Box mt={1}>
                              <img 
                                src={post.image} 
                                alt="Post" 
                                style={{ maxWidth: '100%', maxHeight: 100, borderRadius: 4 }} 
                              />
                            </Box>
                          )}
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(post.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Scheduler; 