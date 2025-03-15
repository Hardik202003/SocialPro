import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Mock data for when the API is not available
export const MOCK_SOCIAL_MEDIA_STATS = {
  facebook: {
    followers: 15750,
    engagement: 4.8,
    posts: 67,
    growth: 7.2,
    recentPosts: [
      {
        id: 'fb1',
        content: 'Check out our latest product launch! #SocialProLaunch',
        likes: 342,
        comments: 56,
        shares: 28,
        date: '2023-06-10T14:30:00Z'
      },
      {
        id: 'fb2',
        content: 'We\'re excited to announce our partnership with @TechInnovators',
        likes: 287,
        comments: 42,
        shares: 19,
        date: '2023-06-08T09:15:00Z'
      }
    ]
  },
  twitter: {
    followers: 12480,
    engagement: 3.9,
    tweets: 189,
    growth: 5.7,
    recentTweets: [
      {
        id: 'tw1',
        content: 'Our team is growing! We\'re looking for talented developers to join us. Apply now: socialpro.careers/jobs',
        likes: 156,
        retweets: 48,
        replies: 23,
        date: '2023-06-12T10:45:00Z'
      },
      {
        id: 'tw2',
        content: 'What features would you like to see in our next update? Let us know in the comments! #ProductFeedback',
        likes: 203,
        retweets: 31,
        replies: 87,
        date: '2023-06-09T16:20:00Z'
      }
    ]
  },
  instagram: {
    followers: 28650,
    engagement: 7.3,
    posts: 52,
    growth: 9.8,
    recentPosts: [
      {
        id: 'ig1',
        imageUrl: 'https://source.unsplash.com/random/1080x1080?product',
        caption: 'Innovation meets design. Our new dashboard in action. #UXDesign #ProductLaunch',
        likes: 1245,
        comments: 98,
        date: '2023-06-11T12:00:00Z'
      },
      {
        id: 'ig2',
        imageUrl: 'https://source.unsplash.com/random/1080x1080?team',
        caption: 'Behind the scenes with our amazing team! #TeamSocialPro #CompanyCulture',
        likes: 978,
        comments: 64,
        date: '2023-06-07T15:30:00Z'
      }
    ]
  },
  linkedin: {
    followers: 8920,
    engagement: 2.7,
    posts: 41,
    growth: 4.9,
    recentPosts: [
      {
        id: 'li1',
        content: 'We\'re proud to announce that SocialPro has been recognized as one of the Top 50 SaaS Companies to Watch in 2023!',
        likes: 423,
        comments: 47,
        shares: 38,
        date: '2023-06-13T11:00:00Z'
      },
      {
        id: 'li2',
        content: 'Our CEO Hardik Suvan will be speaking at the upcoming Digital Marketing Summit. Join us to learn about the future of social media analytics.',
        likes: 312,
        comments: 29,
        shares: 24,
        date: '2023-06-05T09:45:00Z'
      }
    ]
  },
  recentActivity: [
    {
      id: 'act1',
      platform: 'facebook',
      type: 'comment',
      content: 'User @JaneSmith commented: "Love your new products! When will they be available internationally?"',
      time: '2 hours ago'
    },
    {
      id: 'act2',
      platform: 'instagram',
      type: 'mention',
      content: '@TechReviewer mentioned you in a post: "Impressed with @SocialPro\'s new analytics dashboard!"',
      time: '5 hours ago'
    },
    {
      id: 'act3',
      platform: 'twitter',
      type: 'reply',
      content: 'You replied to @MarketingGuru: "Thanks for the feedback! We\'re working on implementing those features."',
      time: '1 day ago'
    },
    {
      id: 'act4',
      platform: 'linkedin',
      type: 'share',
      content: 'Your article "The Future of Social Media Analytics" was shared by @TechInnovations',
      time: '2 days ago'
    }
  ],
  scheduledPosts: [
    {
      id: 'sch1',
      content: 'Excited to announce our new feature release! Stay tuned for more details. #ProductUpdate',
      platforms: ['facebook', 'twitter', 'linkedin'],
      scheduledFor: '2023-06-20T09:00:00Z'
    },
    {
      id: 'sch2',
      content: 'Join our webinar on "Maximizing Social Media Engagement" this Friday at 2 PM EST. Register now: socialpro.com/webinar',
      platforms: ['facebook', 'linkedin'],
      scheduledFor: '2023-06-18T14:00:00Z'
    }
  ],
  engagementData: {
    labels: ['Jun 1', 'Jun 2', 'Jun 3', 'Jun 4', 'Jun 5', 'Jun 6', 'Jun 7', 'Jun 8', 'Jun 9', 'Jun 10', 'Jun 11', 'Jun 12', 'Jun 13', 'Jun 14'],
    datasets: [
      {
        label: 'Facebook',
        data: [15, 22, 19, 24, 27, 25, 30, 32, 35, 38, 36, 40, 43, 45],
        borderColor: '#4267B2',
        backgroundColor: 'rgba(66, 103, 178, 0.1)',
      },
      {
        label: 'Twitter',
        data: [12, 15, 14, 18, 20, 19, 22, 25, 24, 28, 30, 32, 35, 38],
        borderColor: '#1DA1F2',
        backgroundColor: 'rgba(29, 161, 242, 0.1)',
      },
      {
        label: 'Instagram',
        data: [30, 35, 38, 42, 45, 48, 52, 55, 58, 62, 65, 68, 72, 75],
        borderColor: '#E1306C',
        backgroundColor: 'rgba(225, 48, 108, 0.1)',
      },
      {
        label: 'LinkedIn',
        data: [8, 10, 12, 14, 15, 17, 19, 20, 22, 24, 25, 27, 29, 30],
        borderColor: '#0077B5',
        backgroundColor: 'rgba(0, 119, 181, 0.1)',
      },
    ],
  },
  topPerformingContent: [
    {
      id: 'top1',
      platform: 'instagram',
      type: 'image',
      engagement: 2345,
      content: 'Product showcase with customer testimonials',
      performance: '+28% above average'
    },
    {
      id: 'top2',
      platform: 'facebook',
      type: 'video',
      engagement: 1876,
      content: 'Behind-the-scenes company culture video',
      performance: '+22% above average'
    },
    {
      id: 'top3',
      platform: 'linkedin',
      type: 'article',
      engagement: 1245,
      content: 'Industry trends analysis by our CEO',
      performance: '+18% above average'
    }
  ],
  audienceData: {
    demographics: {
      age: [
        { group: '18-24', percentage: 22 },
        { group: '25-34', percentage: 38 },
        { group: '35-44', percentage: 25 },
        { group: '45-54', percentage: 10 },
        { group: '55+', percentage: 5 }
      ],
      gender: [
        { group: 'Male', percentage: 54 },
        { group: 'Female', percentage: 45 },
        { group: 'Other', percentage: 1 }
      ],
      location: [
        { country: 'United States', percentage: 42 },
        { country: 'India', percentage: 18 },
        { country: 'United Kingdom', percentage: 12 },
        { country: 'Canada', percentage: 8 },
        { country: 'Australia', percentage: 6 },
        { country: 'Other', percentage: 14 }
      ]
    },
    interests: [
      { category: 'Technology', percentage: 45 },
      { category: 'Business', percentage: 38 },
      { category: 'Marketing', percentage: 32 },
      { category: 'Design', percentage: 28 },
      { category: 'Entrepreneurship', percentage: 25 }
    ]
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