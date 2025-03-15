# SocialPro Dashboard

A comprehensive dashboard for managing and analyzing social media accounts across multiple platforms. This application provides analytics, scheduling capabilities, and a unified interface for social media management.

## Features

- **Dashboard Overview**: View key metrics and performance indicators across all social media platforms
- **Analytics**: Detailed charts and visualizations for engagement, followers, and interactions
- **Content Scheduler**: Schedule and manage posts across multiple platforms
- **Settings**: Configure application preferences and notification settings

## Technologies Used

- React
- Chart.js for data visualization
- Material UI for component library
- Node.js and Express for backend
- Vite for frontend tooling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Hardik202003/SocialPro.git
cd SocialPro
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
# Start both frontend and backend
npm run start

# Start only frontend
npm run dev

# Start only backend
npm run server:dev
```

4. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

- `GET /api/stats` - Get social media statistics
- `GET /api/schedule` - Get scheduled posts
- `POST /api/schedule` - Create a new scheduled post
- `DELETE /api/schedule/:id` - Delete a scheduled post

## Live Demo

Visit the live demo at: https://hardik202003.github.io/SocialPro/

## License

MIT
