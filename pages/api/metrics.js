// Prometheus-compatible metrics endpoint
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const metrics = `# HELP raiku_validator_status Current validator status (1=running, 0=stopped)
# TYPE raiku_validator_status gauge
raiku_validator_status 1

# HELP raiku_validator_uptime_seconds Total uptime in seconds
# TYPE raiku_validator_uptime_seconds counter
raiku_validator_uptime_seconds 12345

# HELP raiku_validator_revenue_sol Total revenue in SOL
# TYPE raiku_validator_revenue_sol counter
raiku_validator_revenue_sol 12.4

# HELP raiku_validator_stake_sol Total stake in SOL
# TYPE raiku_validator_stake_sol gauge
raiku_validator_stake_sol 125000

# HELP raiku_validator_commission_rate Commission rate percentage
# TYPE raiku_validator_commission_rate gauge
raiku_validator_commission_rate 8.5

# HELP raiku_validator_apy_percent Current APY percentage
# TYPE raiku_validator_apy_percent gauge
raiku_validator_apy_percent 7.2

# HELP raiku_validator_vote_success_rate Vote success rate percentage
# TYPE raiku_validator_vote_success_rate gauge
raiku_validator_vote_success_rate 98.7

# HELP raiku_validator_blockspace_sold Total blockspace sold
# TYPE raiku_validator_blockspace_sold counter
raiku_validator_blockspace_sold 152

# HELP raiku_validator_cpu_usage_percent CPU usage percentage
# TYPE raiku_validator_cpu_usage_percent gauge
raiku_validator_cpu_usage_percent 35

# HELP raiku_validator_memory_usage_gb Memory usage in GB
# TYPE raiku_validator_memory_usage_gb gauge
raiku_validator_memory_usage_gb 1.2

# HELP raiku_validator_network_latency_ms Network latency in milliseconds
# TYPE raiku_validator_network_latency_ms gauge
raiku_validator_network_latency_ms 45

# HELP raiku_validator_skipped_slots_percent Skipped slots percentage
# TYPE raiku_validator_skipped_slots_percent gauge
raiku_validator_skipped_slots_percent 0.3

# HELP raiku_validator_delegators_total Total number of delegators
# TYPE raiku_validator_delegators_total gauge
raiku_validator_delegators_total 5

# HELP raiku_validator_transactions_queued Number of transactions in queue
# TYPE raiku_validator_transactions_queued gauge
raiku_validator_transactions_queued 3

# HELP raiku_validator_reservations_aot_pending AOT reservations pending
# TYPE raiku_validator_reservations_aot_pending gauge
raiku_validator_reservations_aot_pending 12

# HELP raiku_validator_reservations_jit_pending JIT reservations pending
# TYPE raiku_validator_reservations_jit_pending gauge
raiku_validator_reservations_jit_pending 5
`;

  res.setHeader('Content-Type', 'text/plain; version=0.0.4; charset=utf-8');
  res.status(200).send(metrics);
}
