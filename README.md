# Raiku Sidecar Manager Dashboard

A Next.js dashboard application for monitoring and controlling the Raiku Sidecar Manager.

## Features

- **Real-time Status Monitoring**: View sidecar status, uptime, and system health
- **Performance Metrics**: Track blockspace sold, revenue earned, CPU, and memory usage
- **Live Logs**: Display recent log entries with auto-refresh
- **Control Panel**: Start, stop, and restart the sidecar service
- **Auto-increment Simulation**: Revenue and blockspace automatically increment when running
- **Responsive Design**: Modern UI built with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Endpoints

### GET /api/status
Returns current sidecar status and metrics:
```json
{
  "status": "running",
  "uptime": "2h 15m",
  "blockspaceSold": 152,
  "revenueEarned": 12.4,
  "cpuUsage": "35%",
  "memoryUsage": "1.2GB",
  "lastError": null
}
```

### POST /api/status
Control the sidecar service:
- `{ "action": "start" }` - Start the sidecar
- `{ "action": "stop" }` - Stop the sidecar  
- `{ "action": "restart" }` - Restart the sidecar

### GET /api/logs
Returns the last 3 log entries:
```json
{
  "logs": [
    "2025-09-27 10:01: Service started",
    "2025-09-27 10:05: Blockspace reserved by user X",
    "2025-09-27 10:07: Revenue +0.2 SOL"
  ]
}
```

### POST /api/logs
Add a new log entry:
```json
{
  "message": "Custom log message"
}
```

## Deployment

This application is ready for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

The app will work out of the box with no additional configuration needed.

## Demo Features

- **Auto-refresh**: Data updates every 5 seconds
- **Revenue Simulation**: Revenue and blockspace increment every 10 seconds when running
- **Interactive Controls**: Click Start/Stop/Restart to control the sidecar
- **Real-time Logs**: New log entries appear automatically
- **Responsive Layout**: Works on desktop and mobile devices
