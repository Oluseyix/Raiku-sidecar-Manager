// Global state to track sidecar status
let sidecarState = {
  status: "running",
  uptime: "2h 15m",
  blockspaceSold: 152,
  revenueEarned: 12.4,
  cpuUsage: "35%",
  memoryUsage: "1.2GB",
  lastError: null,
  startTime: Date.now() - (2 * 60 * 60 * 1000 + 15 * 60 * 1000) // 2h 15m ago
};

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Calculate uptime based on current time
    const now = Date.now();
    const uptimeMs = now - sidecarState.startTime;
    const hours = Math.floor(uptimeMs / (1000 * 60 * 60));
    const minutes = Math.floor((uptimeMs % (1000 * 60 * 60)) / (1000 * 60));
    
    res.status(200).json({
      ...sidecarState,
      uptime: `${hours}h ${minutes}m`
    });
  } else if (req.method === 'POST') {
    const { action } = req.body;
    
    switch (action) {
      case 'start':
        sidecarState.status = "running";
        sidecarState.startTime = Date.now();
        sidecarState.lastError = null;
        break;
      case 'stop':
        sidecarState.status = "stopped";
        break;
      case 'restart':
        sidecarState.status = "running";
        sidecarState.startTime = Date.now();
        sidecarState.lastError = null;
        break;
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }
    
    res.status(200).json({ success: true, status: sidecarState.status });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
