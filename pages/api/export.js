// Data export endpoint for JSON and CSV
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { format } = req.query;

  // Sample data for export
  const exportData = {
    validator: {
      name: "Raiku Validator #1",
      status: "running",
      uptime: "3h 25m",
      revenue: 12.4,
      stake: 125000,
      commission: 8.5,
      apy: 7.2,
      voteSuccess: 98.7,
      blockspaceSold: 152,
      cpuUsage: 35,
      memoryUsage: 1.2,
      networkLatency: 45,
      skippedSlots: 0.3
    },
    delegators: [
      { address: "ABC123...", stake: 50000, percentage: 40, status: "active", change: "+5%" },
      { address: "DEF456...", stake: 30000, percentage: 24, status: "active", change: "+2%" },
      { address: "GHI789...", stake: 20000, percentage: 16, status: "active", change: "-1%" },
      { address: "JKL012...", stake: 15000, percentage: 12, status: "active", change: "+3%" },
      { address: "MNO345...", stake: 10000, percentage: 8, status: "active", change: "0%" }
    ],
    transactions: [
      { id: 1, type: "AOT", priority: "high", status: "queued", amount: 500, price: 0.1, timestamp: new Date().toISOString() },
      { id: 2, type: "JIT", priority: "medium", status: "injected", amount: 250, price: 0.15, timestamp: new Date().toISOString() },
      { id: 3, type: "AOT", priority: "low", status: "confirmed", amount: 1000, price: 0.08, timestamp: new Date().toISOString() }
    ],
    reservations: {
      aot: { pending: 12, fulfilled: 8, avgPrice: 0.12 },
      jit: { pending: 5, fulfilled: 15, avgPrice: 0.18 }
    },
    exportTimestamp: new Date().toISOString()
  };

  if (format === 'csv') {
    // Convert to CSV format
    const csvData = [
      // Validator metrics
      ['Metric', 'Value'],
      ['Status', exportData.validator.status],
      ['Uptime', exportData.validator.uptime],
      ['Revenue (SOL)', exportData.validator.revenue],
      ['Stake (SOL)', exportData.validator.stake],
      ['Commission (%)', exportData.validator.commission],
      ['APY (%)', exportData.validator.apy],
      ['Vote Success (%)', exportData.validator.voteSuccess],
      ['Blockspace Sold', exportData.validator.blockspaceSold],
      ['CPU Usage (%)', exportData.validator.cpuUsage],
      ['Memory Usage (GB)', exportData.validator.memoryUsage],
      ['Network Latency (ms)', exportData.validator.networkLatency],
      ['Skipped Slots (%)', exportData.validator.skippedSlots],
      ['', ''],
      // Delegators
      ['Delegator Address', 'Stake (SOL)', 'Percentage (%)', 'Status', 'Change (%)'],
      ...exportData.delegators.map(d => [d.address, d.stake, d.percentage, d.status, d.change]),
      ['', ''],
      // Transactions
      ['Transaction ID', 'Type', 'Priority', 'Status', 'Amount (SOL)', 'Price (SOL)', 'Timestamp'],
      ...exportData.transactions.map(t => [t.id, t.type, t.priority, t.status, t.amount, t.price, t.timestamp])
    ].map(row => row.join(',')).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=raiku-validator-data.csv');
    res.status(200).send(csvData);
  } else {
    // Default to JSON format
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=raiku-validator-data.json');
    res.status(200).json(exportData);
  }
}
