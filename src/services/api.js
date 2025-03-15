import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Mock data for when the API is not available
export const MOCK_SOCIAL_MEDIA_STATS = {
  facebook: {
    followers: 12500,
    engagement: 3.2,
    posts: 45,
    growth: 5.7
  },
  twitter: {
    followers: 8700,
    engagement: 2.8,
    tweets: 120,
    growth: 4.2
  },
  instagram: {
    followers: 22300,
    engagement: 6.1,
    posts: 38,
    growth: 8.4
  },
  linkedin: {
    followers: 5400,
    engagement: 1.9,
    posts: 25,
    growth: 3.5
  },
  engagementData: {
    labels: ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7', 'Jan 8', 'Jan 9', 'Jan 10', 'Jan 11', 'Jan 12', 'Jan 13', 'Jan 14'],
    datasets: [
      {
        label: 'Facebook',
        data: [12, 19, 14, 15, 18, 14, 20, 21, 22, 19, 18, 24, 25, 23],
        borderColor: '#4267B2',
        backgroundColor: 'rgba(66, 103, 178, 0.1)',
      },
      {
        label: 'Twitter',
        data: [8, 12, 9, 11, 10, 13, 15, 14, 16, 17, 15, 18, 19, 20],
        borderColor: '#1DA1F2',
        backgroundColor: 'rgba(29, 161, 242, 0.1)',
      },
      {
        label: 'Instagram',
        data: [20, 22, 25, 24, 26, 28, 30, 29, 31, 32, 30, 33, 35, 36],
        borderColor: '#E1306C',
        backgroundColor: 'rgba(225, 48, 108, 0.1)',
      },
      {
        label: 'LinkedIn',
        data: [5, 7, 6, 8, 9, 8, 10, 11, 12, 10, 11, 13, 14, 15],
        borderColor: '#0077B5',
        backgroundColor: 'rgba(0, 119, 181, 0.1)',
      },
    ],
  }
};

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
    console.log('Using mock data instead');
    return MOCK_SOCIAL_MEDIA_STATS;
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