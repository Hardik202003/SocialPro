import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Social media stats
export const fetchSocialMediaStats = async () => {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching social media stats:', error);
    throw error;
  }
};

// Scheduled posts
export const fetchScheduledPosts = async () => {
  try {
    const response = await api.get('/schedule');
    return response.data;
  } catch (error) {
    console.error('Error fetching scheduled posts:', error);
    throw error;
  }
};

export const createScheduledPost = async (postData) => {
  try {
    const response = await api.post('/schedule', postData);
    return response.data;
  } catch (error) {
    console.error('Error creating scheduled post:', error);
    throw error;
  }
};

export const deleteScheduledPost = async (postId) => {
  try {
    const response = await api.delete(`/schedule/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting scheduled post:', error);
    throw error;
  }
};

export default api; 