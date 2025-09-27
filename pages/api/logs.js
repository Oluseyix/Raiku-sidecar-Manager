// Mock logs data
let logs = [
  "2025-09-27 10:01: Service started",
  "2025-09-27 10:05: Blockspace reserved by user X",
  "2025-09-27 10:07: Revenue +0.2 SOL",
  "2025-09-27 10:12: New connection established",
  "2025-09-27 10:15: Blockspace sold to user Y",
  "2025-09-27 10:18: Revenue +0.5 SOL"
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Return last 3 log entries
    const lastThreeLogs = logs.slice(-3);
    res.status(200).json({ logs: lastThreeLogs });
  } else if (req.method === 'POST') {
    const { message } = req.body;
    if (message) {
      const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
      logs.push(`${timestamp}: ${message}`);
      // Keep only last 10 logs
      if (logs.length > 10) {
        logs = logs.slice(-10);
      }
    }
    res.status(200).json({ success: true });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
