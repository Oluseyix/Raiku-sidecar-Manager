import { useState, useEffect } from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement, Filler } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  Filler
);

export default function Home() {
  // MULTI-VALIDATOR SUPPORT
  const [validators, setValidators] = useState([
    { 
      id: 1, 
      name: 'Raiku Validator #1', 
      status: 'running', 
      revenue: 12.4, 
      stake: 125000,
      uptime: 0,
      blockspace: 152,
      commission: 8.5,
      apy: 7.2,
      votes: 98.7,
      skippedSlots: 0.3,
      cpuUsage: 35,
      memoryUsage: 1.2,
      networkLatency: 45,
      totalDelegations: 0,
      activeStake: 125000
    },
    { 
      id: 2, 
      name: 'Raiku Validator #2', 
      status: 'stopped', 
      revenue: 8.2, 
      stake: 85000,
      uptime: 0,
      blockspace: 89,
      commission: 7.8,
      apy: 6.9,
      votes: 97.2,
      skippedSlots: 1.2,
      cpuUsage: 0,
      memoryUsage: 0.8,
      networkLatency: 0,
      totalDelegations: 0,
      activeStake: 85000
    },
    { 
      id: 3, 
      name: 'Raiku Validator #3', 
      status: 'running', 
      revenue: 15.6, 
      stake: 150000,
      uptime: 0,
      blockspace: 203,
      commission: 9.2,
      apy: 7.8,
      votes: 99.1,
      skippedSlots: 0.1,
      cpuUsage: 42,
      memoryUsage: 1.5,
      networkLatency: 38,
      totalDelegations: 0,
      activeStake: 150000
    },
  ]);
  const [selectedValidator, setSelectedValidator] = useState(1);

  // Get current validator data
  const getCurrentValidator = () => {
    return validators.find(v => v.id === selectedValidator) || validators[0];
  };

  const currentValidator = getCurrentValidator();
  const status = currentValidator.status;
  const uptime = currentValidator.uptime;
  const blockspace = currentValidator.blockspace;
  const revenue = currentValidator.revenue;
  const stake = currentValidator.stake;
  const commission = currentValidator.commission;
  const apy = currentValidator.apy;
  const epoch = 456; // This can be shared across validators
  const votes = currentValidator.votes;
  const skippedSlots = currentValidator.skippedSlots;
  const cpuUsage = currentValidator.cpuUsage;
  const memoryUsage = currentValidator.memoryUsage;
  const networkLatency = currentValidator.networkLatency;
  const totalDelegations = currentValidator.totalDelegations;
  const activeStake = currentValidator.activeStake;

  // INCIDENT TIMELINE (Nice-to-have)
  const [incidentTimeline, setIncidentTimeline] = useState([
    {
      id: 1,
      timestamp: new Date('2025-01-27T12:39:00Z'),
      type: 'performance',
      severity: 'warning',
      title: 'High CPU Usage Detected',
      description: 'CPU usage spiked to 85% for 2 minutes',
      relatedEvents: ['network-latency-increase', 'memory-usage-spike'],
      resolved: true
    },
    {
      id: 2,
      timestamp: new Date('2025-01-27T12:41:00Z'),
      type: 'network',
      severity: 'info',
      title: 'Network Latency Increase',
      description: 'Latency increased from 45ms to 120ms',
      relatedEvents: ['cpu-usage-spike'],
      resolved: true
    },
    {
      id: 3,
      timestamp: new Date('2025-01-27T12:43:00Z'),
      type: 'delegation',
      severity: 'success',
      title: 'New Large Delegation',
      description: 'Received 5,000 SOL delegation from ABC123...',
      relatedEvents: [],
      resolved: true
    }
  ]);

  // COMMUNITY PORTAL DATA (Nice-to-have - Light Version)
  const [publicMetrics, setPublicMetrics] = useState({
    uptime: 99.97,
    apy: 7.2,
    reliability: 98.7,
    totalStake: 125000,
    delegatorCount: 5
  });

  // LIVE DATA ARRAYS
  const [revenueHistory, setRevenueHistory] = useState([]);
  const [blockspaceHistory, setBlockspaceHistory] = useState([]);
  const [stakeHistory, setStakeHistory] = useState([]);
  const [apyHistory, setApyHistory] = useState([]);
  const [voteHistory, setVoteHistory] = useState([]);
  const [commissionHistory, setCommissionHistory] = useState([]);
  const [revenueBreakdown, setRevenueBreakdown] = useState([]);
  const [skippedSlotsHistory, setSkippedSlotsHistory] = useState([]);

  // ENHANCED LOGS
  const [logs, setLogs] = useState([
    "2025-01-27 10:01:15: Validator started successfully",
    "2025-01-27 10:01:23: Epoch 456 began - 2,847 slots",
    "2025-01-27 10:01:45: New stake delegation +500 SOL",
    "2025-01-27 10:02:12: Revenue earned +0.15 SOL",
    "2025-01-27 10:02:33: Blockspace sold +3 units",
    "2025-01-27 10:03:01: Vote success rate: 98.7%",
    "2025-01-27 10:03:15: Commission collected: 8.5%",
    "2025-01-27 10:03:28: New delegation +250 SOL"
  ]);

  // Initialize history arrays with dummy data
  useEffect(() => {
    const generateHistory = (initialValue, fluctuation, length) => {
      let history = [];
      for (let i = 0; i < length; i++) {
        history.push({
          time: `10:${String(i).padStart(2, '0')}`,
          value: parseFloat((initialValue + (Math.random() - 0.5) * fluctuation).toFixed(2))
        });
      }
      return history;
    };

    setRevenueHistory(generateHistory(12.4, 0.5, 10));
    setBlockspaceHistory(generateHistory(152, 10, 10));
    setStakeHistory(generateHistory(125000, 2000, 10));
    setApyHistory(generateHistory(7.2, 0.3, 10));
    setVoteHistory(generateHistory(98.7, 0.5, 10));
    setCommissionHistory(generateHistory(8.5, 0.1, 10));
    setRevenueBreakdown([
      { source: 'Staking Rewards', value: 8.2, color: '#accf4c' },
      { source: 'Blockspace Sales', value: 4.2, color: '#3b82f6' }
    ]);
    setSkippedSlotsHistory(generateHistory(0.3, 0.2, 10));
  }, []);

  // UPTIME COUNTER
  useEffect(() => {
    if (status !== "running") return;
    const interval = setInterval(() => {
      setValidators(prev => prev.map(v => 
        v.id === selectedValidator 
          ? { ...v, uptime: v.uptime + 1 }
          : v
      ));
    }, 1000);
    return () => clearInterval(interval);
  }, [status, selectedValidator]);

  // LIVE DATA SIMULATION
  useEffect(() => {
    if (status !== "running") return;
    const interval = setInterval(() => {
      setValidators(prev => prev.map(v => 
        v.id === selectedValidator 
          ? {
              ...v,
              revenue: parseFloat((v.revenue + 0.1).toFixed(2)),
              blockspace: v.blockspace + 1,
              apy: parseFloat((v.apy + (Math.random() - 0.5) * 0.1).toFixed(2)),
              votes: parseFloat((v.votes + (Math.random() - 0.5) * 0.2).toFixed(1)),
              cpuUsage: Math.max(0, Math.min(100, v.cpuUsage + (Math.random() - 0.5) * 5)),
              memoryUsage: parseFloat((v.memoryUsage + (Math.random() - 0.5) * 0.1).toFixed(1)),
              networkLatency: Math.max(0, v.networkLatency + (Math.random() - 0.5) * 10),
              skippedSlots: Math.max(0, parseFloat((v.skippedSlots + (Math.random() - 0.5) * 0.1).toFixed(1)))
            }
          : v
      ));

      // Update history arrays
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
      
      setRevenueHistory(prev => [...prev, { time: timeStr, value: parseFloat((revenue + 0.1).toFixed(2)) }].slice(-10));
      setBlockspaceHistory(prev => [...prev, { time: timeStr, value: blockspace + 1 }].slice(-10));
      setStakeHistory(prev => [...prev, { time: timeStr, value: stake + Math.floor(Math.random() * 100) }].slice(-10));
      setApyHistory(prev => [...prev, { time: timeStr, value: parseFloat((apy + (Math.random() - 0.5) * 0.1).toFixed(2)) }].slice(-10));
      setVoteHistory(prev => [...prev, { time: timeStr, value: parseFloat((votes + (Math.random() - 0.5) * 0.2).toFixed(1)) }].slice(-10));
      setCommissionHistory(prev => [...prev, { time: timeStr, value: commission }].slice(-10));
      setSkippedSlotsHistory(prev => [...prev, { time: timeStr, value: Math.max(0, parseFloat((skippedSlots + (Math.random() - 0.5) * 0.1).toFixed(1))) }].slice(-10));

      // Add new log entries
      const logTypes = [
        "Epoch 456 completed - 2,847 slots processed",
        "New stake delegation +500 SOL",
        "Revenue earned +0.15 SOL",
        "Blockspace sold +3 units",
        "Vote success rate: 98.7%",
        "Commission collected: 8.5%",
        "New delegation +250 SOL",
        "System performance: Excellent",
        "Network latency: 45ms",
        "CPU usage: 35%"
      ];
      
      const randomLog = logTypes[Math.floor(Math.random() * logTypes.length)];
      const newLog = `${now.toISOString().slice(0, 19).replace('T', ' ')}: ${randomLog}`;
      setLogs(prev => [newLog, ...prev].slice(0, 20));
    }, 5000);
    return () => clearInterval(interval);
  }, [status, selectedValidator, revenue, blockspace, stake, apy, votes, commission, skippedSlots]);

  const toggleStatus = (action) => {
    setValidators(prev => prev.map(v => 
      v.id === selectedValidator 
        ? {
            ...v,
            status: action === "start" ? "running" : action === "stop" ? "stopped" : "running",
            uptime: action === "restart" ? 0 : v.uptime
          }
        : v
    ));
  };

  const formatUptime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
    },
  };

  const revenueData = {
    labels: revenueHistory.map((d) => d.time),
    datasets: [{
      label: "Revenue (SOL)",
      data: revenueHistory.map((d) => d.value),
      borderColor: "#accf4c",
      backgroundColor: "rgba(172, 207, 76, 0.1)",
      fill: true,
      tension: 0.4
    }],
  };

  const stakeData = {
    labels: stakeHistory.map((d) => d.time),
    datasets: [{
      label: "Stake (SOL)",
      data: stakeHistory.map((d) => d.value),
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      fill: true,
      tension: 0.4
    }],
  };

  const apyData = {
    labels: apyHistory.map((d) => d.time),
    datasets: [{
      label: "APY (%)",
      data: apyHistory.map((d) => d.value),
      borderColor: "#f59e0b",
      backgroundColor: "rgba(245, 158, 11, 0.1)",
      fill: true,
      tension: 0.4
    }],
  };

  const voteData = {
    labels: voteHistory.map((d) => d.time),
    datasets: [{
      label: "Vote Success (%)",
      data: voteHistory.map((d) => d.value),
      borderColor: "#10b981",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      fill: true,
      tension: 0.4
    }],
  };

  const revenueBreakdownData = {
    labels: revenueBreakdown.map((d) => d.source),
    datasets: [{
      data: revenueBreakdown.map((d) => d.value),
      backgroundColor: revenueBreakdown.map((d) => d.color),
      borderWidth: 0
    }],
  };

  const skippedSlotsData = {
    labels: skippedSlotsHistory.map((d) => d.time),
    datasets: [{
      label: "Skipped Slots (%)",
      data: skippedSlotsHistory.map((d) => d.value),
      borderColor: "#ef4444",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      fill: true,
      tension: 0.4
    }],
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="min-h-screen bg-black text-white transition-all duration-500">
        {/* HEADER */}
        <header className="bg-black backdrop-blur-xl border-b border-[#accf4c]/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-black rounded-xl flex items-center justify-center shadow-lg shadow-[#accf4c]/30 border border-[#accf4c]/20">
                  <img 
                    src="/raiku.jpg" 
                    alt="Raiku Logo" 
                    className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#accf4c]">Raiku Sidecar Manager</h1>
                  <p className="text-xs sm:text-sm text-gray-400">Multi-Validator Platform</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#accf4c] animate-pulse shadow-lg shadow-[#accf4c]/50"></div>
                  <span className="text-xs sm:text-sm font-medium text-gray-300">Online</span>
                </div>
                <a 
                  href="/community" 
                  className="px-2 py-1 sm:px-3 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium"
                >
                  Community
                </a>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* VALIDATOR SELECTOR */}
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-[#accf4c]/20 hover:shadow-2xl hover:shadow-[#accf4c]/20 transition-all duration-300 hover:border-[#accf4c]/40 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <div className="w-full sm:w-auto">
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">Active Validator</h2>
                <p className="text-xs sm:text-sm text-gray-400">Select validator to monitor and manage</p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <div className="text-left sm:text-right w-full sm:w-auto">
                  <div className="text-xs sm:text-sm text-gray-400">Current Validator</div>
                  <div className="text-base sm:text-lg font-semibold text-[#accf4c] truncate">{currentValidator.name}</div>
                </div>
                <select 
                  value={selectedValidator} 
                  onChange={(e) => setSelectedValidator(Number(e.target.value))}
                  className="bg-gray-800 border border-[#accf4c]/30 rounded-lg px-3 sm:px-4 py-2 text-white focus:border-[#accf4c] focus:outline-none w-full sm:min-w-[200px] text-sm"
                >
                  {validators.map((validator) => (
                    <option key={validator.id} value={validator.id}>
                      {validator.name} - {validator.status === 'running' ? '🟢' : '🔴'} {validator.status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* MAIN STATUS & CONTROLS */}
          <div className="mb-6 sm:mb-8">
            <div className="bg-black/80 backdrop-blur-xl rounded-3xl p-4 sm:p-6 lg:p-8 border border-[#accf4c]/20 shadow-2xl shadow-[#accf4c]/10">
              <div className="flex flex-col space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-[#accf4c]">{formatUptime(uptime)}</div>
                    <div className="text-xs sm:text-sm text-gray-400">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-[#accf4c]">{revenue.toFixed(3)} SOL</div>
                    <div className="text-xs sm:text-sm text-gray-400">Total Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-[#accf4c]">{formatNumber(stake)}</div>
                    <div className="text-xs sm:text-sm text-gray-400">Total Stake</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 sm:justify-center">
                  <button 
                    onClick={() => toggleStatus("start")}
                    className="px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-bold transition-all transform hover:scale-105 bg-[#accf4c] hover:bg-[#8bc34a] text-black shadow-lg shadow-[#accf4c]/30 hover:shadow-xl text-sm sm:text-base"
                  >
                    Start
                  </button>
                  <button 
                    onClick={() => toggleStatus("stop")}
                    className="px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-bold transition-all transform hover:scale-105 bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 hover:shadow-xl text-sm sm:text-base"
                  >
                    Stop
                  </button>
                  <button 
                    onClick={() => toggleStatus("restart")}
                    className="px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-bold transition-all transform hover:scale-105 bg-yellow-500 hover:bg-yellow-400 text-black shadow-lg shadow-yellow-500/30 hover:shadow-xl text-sm sm:text-base"
                  >
                    Restart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CORE METRICS - Must Haves */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {/* Total Stake */}
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 border border-[#accf4c]/20 hover:shadow-2xl hover:shadow-[#accf4c]/20 transition-all duration-300 hover:border-[#accf4c]/40">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-medium text-gray-400 truncate">Total Stake</h3>
                <span className="text-xs px-2 py-1 rounded-full font-semibold bg-[#accf4c]/20 text-[#accf4c] border border-[#accf4c]/30">+2.1%</span>
              </div>
              <div className="text-lg font-bold truncate text-[#accf4c]">{formatNumber(stake)} SOL</div>
            </div>

            {/* Active Stake */}
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 border border-[#accf4c]/20 hover:shadow-2xl hover:shadow-[#accf4c]/20 transition-all duration-300 hover:border-[#accf4c]/40">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-medium text-gray-400 truncate">Active Stake</h3>
                <span className="text-xs px-2 py-1 rounded-full font-semibold bg-[#accf4c]/20 text-[#accf4c] border border-[#accf4c]/30">+1.8%</span>
              </div>
              <div className="text-lg font-bold truncate text-blue-400">{formatNumber(activeStake)} SOL</div>
            </div>

            {/* Commission Rate */}
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 border border-[#accf4c]/20 hover:shadow-2xl hover:shadow-[#accf4c]/20 transition-all duration-300 hover:border-[#accf4c]/40">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-medium text-gray-400 truncate">Commission Rate</h3>
                <span className="text-xs px-2 py-1 rounded-full font-semibold bg-gray-700 text-gray-300 border border-gray-600">stable</span>
              </div>
              <div className="text-lg font-bold truncate text-purple-400">{commission}%</div>
            </div>

            {/* Current APY */}
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 border border-[#accf4c]/20 hover:shadow-2xl hover:shadow-[#accf4c]/20 transition-all duration-300 hover:border-[#accf4c]/40">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-medium text-gray-400 truncate">Current APY</h3>
                <span className="text-xs px-2 py-1 rounded-full font-semibold bg-[#accf4c]/20 text-[#accf4c] border border-[#accf4c]/30">+0.3%</span>
              </div>
              <div className="text-lg font-bold truncate text-yellow-400">{apy}%</div>
            </div>

            {/* Vote Success */}
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 border border-[#accf4c]/20 hover:shadow-2xl hover:shadow-[#accf4c]/20 transition-all duration-300 hover:border-[#accf4c]/40">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-medium text-gray-400 truncate">Vote Success</h3>
                <span className="text-xs px-2 py-1 rounded-full font-semibold bg-[#accf4c]/20 text-[#accf4c] border border-[#accf4c]/30">+0.1%</span>
              </div>
              <div className="text-lg font-bold truncate text-[#accf4c]">{votes}%</div>
            </div>

            {/* Blockspace Sold */}
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 border border-[#accf4c]/20 hover:shadow-2xl hover:shadow-[#accf4c]/20 transition-all duration-300 hover:border-[#accf4c]/40">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-medium text-gray-400 truncate">Blockspace Sold</h3>
                <span className="text-xs px-2 py-1 rounded-full font-semibold bg-[#accf4c]/20 text-[#accf4c] border border-[#accf4c]/30">+12%</span>
              </div>
              <div className="text-lg font-bold truncate text-red-400">{blockspace} units</div>
            </div>
          </div>

          {/* CHARTS - Core Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Revenue Over Time */}
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-[#accf4c]/20 hover:shadow-2xl hover:shadow-[#accf4c]/20 transition-all duration-300 hover:border-[#accf4c]/40">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-white">Revenue Over Time</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#accf4c] rounded-full animate-pulse"></div>
                  <div className="text-xs sm:text-sm text-gray-400">Live</div>
                </div>
              </div>
              <div className="h-48 sm:h-64">
                <Line data={revenueData} options={chartOptions} />
              </div>
            </div>

            {/* Stake Growth */}
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-[#accf4c]/20 hover:shadow-2xl hover:shadow-[#accf4c]/20 transition-all duration-300 hover:border-[#accf4c]/40">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-white">Stake Growth</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#accf4c] rounded-full animate-pulse"></div>
                  <div className="text-xs sm:text-sm text-gray-400">Live</div>
                </div>
              </div>
              <div className="h-48 sm:h-64">
                <Line data={stakeData} options={chartOptions} />
              </div>
            </div>

            {/* APY Over Time */}
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-[#accf4c]/20 hover:shadow-2xl hover:shadow-[#accf4c]/20 transition-all duration-300 hover:border-[#accf4c]/40">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-white">APY Over Time</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#accf4c] rounded-full animate-pulse"></div>
                  <div className="text-xs sm:text-sm text-gray-400">Live</div>
                </div>
              </div>
              <div className="h-48 sm:h-64">
                <Line data={apyData} options={chartOptions} />
              </div>
            </div>

            {/* Vote Success Rate */}
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-[#accf4c]/20 hover:shadow-2xl hover:shadow-[#accf4c]/20 transition-all duration-300 hover:border-[#accf4c]/40">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-white">Vote Success Rate</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#accf4c] rounded-full animate-pulse"></div>
                  <div className="text-xs sm:text-sm text-gray-400">Live</div>
                </div>
              </div>
              <div className="h-48 sm:h-64">
                <Line data={voteData} options={chartOptions} />
              </div>
            </div>

            {/* Revenue Breakdown */}
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-[#accf4c]/20 hover:shadow-2xl hover:shadow-[#accf4c]/20 transition-all duration-300 hover:border-[#accf4c]/40">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-white">Revenue Breakdown</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#accf4c] rounded-full animate-pulse"></div>
                  <div className="text-xs sm:text-sm text-gray-400">Live</div>
                </div>
              </div>
              <div className="h-48 sm:h-64">
                <Doughnut data={revenueBreakdownData} options={chartOptions} />
              </div>
            </div>

            {/* Skipped Slots */}
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-[#accf4c]/20 hover:shadow-2xl hover:shadow-[#accf4c]/20 transition-all duration-300 hover:border-[#accf4c]/40">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-white">Skipped Slots</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#accf4c] rounded-full animate-pulse"></div>
                  <div className="text-xs sm:text-sm text-gray-400">Live</div>
                </div>
              </div>
              <div className="h-48 sm:h-64">
                <Line data={skippedSlotsData} options={chartOptions} />
              </div>
            </div>
          </div>

          {/* SYSTEM PERFORMANCE */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="lg:col-span-1 bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-[#accf4c]/20 hover:shadow-2xl hover:shadow-[#accf4c]/20 transition-all duration-300 hover:border-[#accf4c]/40">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">System Performance</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-400">CPU Usage</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#accf4c] shadow-lg shadow-[#accf4c]/50"></div>
                    <span className="text-xs sm:text-sm font-medium text-white">{cpuUsage}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-400">Memory Usage</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#accf4c] shadow-lg shadow-[#accf4c]/50"></div>
                    <span className="text-xs sm:text-sm font-medium text-white">{memoryUsage}GB</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-400">Network Latency</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#accf4c] shadow-lg shadow-[#accf4c]/50"></div>
                    <span className="text-xs sm:text-sm font-medium text-white">{networkLatency}ms</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-400">Skipped Slots</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#accf4c] shadow-lg shadow-[#accf4c]/50"></div>
                    <span className="text-xs sm:text-sm font-medium text-white">{skippedSlots}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-400">Total Delegations</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs sm:text-sm font-medium text-white">{totalDelegations}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-400">Epoch</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-purple-500"></div>
                    <span className="text-xs sm:text-sm font-medium text-white">{epoch}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ENHANCED LOGS */}
            <div className="lg:col-span-2 bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-[#accf4c]/20 hover:shadow-2xl hover:shadow-[#accf4c]/20 transition-all duration-300 hover:border-[#accf4c]/40">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-white">Live Activity Log</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#accf4c] rounded-full animate-pulse shadow-lg shadow-[#accf4c]/50"></div>
                  <span className="text-xs sm:text-sm text-gray-400">Live</span>
                </div>
              </div>
              <div className="h-48 sm:h-64 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-[#accf4c]/30 scrollbar-track-gray-800">
                {logs.map((log, i) => (
                  <div key={i} className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#accf4c] rounded-full mt-1.5 sm:mt-2 flex-shrink-0 shadow-lg shadow-[#accf4c]/50"></div>
                    <div className="flex-1">
                      <div className="text-xs sm:text-sm text-gray-300 break-words">{log}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* INCIDENT TIMELINE - Nice to Have */}
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-orange-500/20 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:border-orange-500/40 mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white flex flex-col sm:flex-row sm:items-center">
              <span>Incident Timeline & Root Cause Analysis</span>
              <span className="ml-0 sm:ml-2 mt-1 sm:mt-0 px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full w-fit">AUTO-CORRELATED</span>
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {incidentTimeline.map((incident) => (
                <div key={incident.id} className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-800/50 rounded-lg border-l-4 border-orange-500">
                  <div className="flex-shrink-0">
                    <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mt-1.5 sm:mt-2 ${
                      incident.severity === 'success' ? 'bg-green-500' :
                      incident.severity === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
                      <h4 className="text-xs sm:text-sm font-medium text-white truncate">{incident.title}</h4>
                      <span className="text-xs text-gray-400">
                        {incident.timestamp.toLocaleTimeString('en-US', { 
                          hour12: false, 
                          hour: '2-digit', 
                          minute: '2-digit', 
                          second: '2-digit' 
                        })}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 mt-1 break-words">{incident.description}</p>
                    {incident.relatedEvents.length > 0 && (
                      <div className="mt-2 flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                        <span className="text-xs text-orange-300">🔗 Related:</span>
                        <span className="text-xs text-gray-400 break-words">{incident.relatedEvents.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COMMUNITY PORTAL PREVIEW - Nice to Have */}
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:border-blue-500/40 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Community Portal Preview
              </h3>
              <a 
                href="/community" 
                className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium w-fit"
              >
                View Full Portal
              </a>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              {/* Primary Metrics */}
              <div>
                <h4 className="text-xs sm:text-sm font-medium text-blue-300 mb-3 sm:mb-4">Primary Performance Metrics</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="bg-black/40 rounded-xl p-3 sm:p-4 text-center border border-blue-500/30">
                    <div className="text-xl sm:text-2xl font-bold text-blue-400 mb-1">{publicMetrics.uptime}%</div>
                    <div className="text-xs text-gray-400">Uptime (30D)</div>
                  </div>
                  <div className="bg-black/40 rounded-xl p-3 sm:p-4 text-center border border-green-500/30">
                    <div className="text-xl sm:text-2xl font-bold text-green-400 mb-1">{publicMetrics.apy}%</div>
                    <div className="text-xs text-gray-400">Current APY</div>
                  </div>
                  <div className="bg-black/40 rounded-xl p-3 sm:p-4 text-center border border-purple-500/30">
                    <div className="text-xl sm:text-2xl font-bold text-purple-400 mb-1">{publicMetrics.reliability}%</div>
                    <div className="text-xs text-gray-400">Reliability Score</div>
                  </div>
                </div>
              </div>

              {/* Secondary Metrics */}
              <div>
                <h4 className="text-xs sm:text-sm font-medium text-blue-300 mb-3 sm:mb-4">Validator Health Metrics</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-black/40 rounded-lg p-2 sm:p-3 text-center border border-gray-600/30">
                    <div className="text-sm sm:text-lg font-bold text-white mb-1">{formatNumber(publicMetrics.totalStake)}</div>
                    <div className="text-xs text-gray-400">Total Stake</div>
                  </div>
                  <div className="bg-black/40 rounded-lg p-2 sm:p-3 text-center border border-gray-600/30">
                    <div className="text-sm sm:text-lg font-bold text-white mb-1">{publicMetrics.delegatorCount}</div>
                    <div className="text-xs text-gray-400">Delegators</div>
                  </div>
                  <div className="bg-black/40 rounded-lg p-2 sm:p-3 text-center border border-gray-600/30">
                    <div className="text-sm sm:text-lg font-bold text-green-400 mb-1">99.9%</div>
                    <div className="text-xs text-gray-400">Vote Success</div>
                  </div>
                  <div className="bg-black/40 rounded-lg p-2 sm:p-3 text-center border border-gray-600/30">
                    <div className="text-sm sm:text-lg font-bold text-red-400 mb-1">0.1%</div>
                    <div className="text-xs text-gray-400">Skipped Slots</div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-black/30 rounded-lg p-3 sm:p-4 border border-blue-500/20">
                <h4 className="text-xs sm:text-sm font-medium text-blue-300 mb-2 sm:mb-3">Trust & Transparency</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-500/30">
                    ✓ Real-time Data
                  </span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                    ✓ Public Metrics
                  </span>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                    ✓ Open Communication
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}