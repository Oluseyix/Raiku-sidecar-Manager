import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function CommunityPortal() {
  const [publicMetrics, setPublicMetrics] = useState({
    uptime: 99.97,
    apy: 7.2,
    reliability: 98.7,
    totalStake: 125000,
    delegatorCount: 5,
    voteSuccess: 99.9,
    skippedSlots: 0.1
  });

  const [uptimeHistory, setUptimeHistory] = useState([]);
  const [apyHistory, setApyHistory] = useState([]);
  const [stakeHistory, setStakeHistory] = useState([]);

  useEffect(() => {
    // Simulate historical data for charts
    const generateHistory = (initialValue, fluctuation, length) => {
      let history = [];
      for (let i = 0; i < length; i++) {
        history.push({
          time: `Day ${i + 1}`,
          value: parseFloat((initialValue + (Math.random() - 0.5) * fluctuation).toFixed(2))
        });
      }
      return history;
    };

    setUptimeHistory(generateHistory(99.9, 0.1, 30));
    setApyHistory(generateHistory(7.0, 0.5, 30));
    setStakeHistory(generateHistory(125000, 2000, 30));
  }, []);

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
            return `${context.dataset.label}: ${context.raw}%`;
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
          callback: function(value) {
            return `${value}%`;
          }
        },
      },
    },
  };

  const uptimeData = {
    labels: uptimeHistory.map(d => d.time),
    datasets: [{
      label: "Uptime (%)",
      data: uptimeHistory.map(d => d.value),
      borderColor: '#accf4c',
      backgroundColor: 'rgba(172, 207, 76, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  const apyData = {
    labels: apyHistory.map(d => d.time),
    datasets: [{
      label: "APY (%)",
      data: apyHistory.map(d => d.value),
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  const stakeData = {
    labels: stakeHistory.map(d => d.time),
    datasets: [{
      label: "Stake (SOL)",
      data: stakeHistory.map(d => d.value),
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Raiku Community Portal</title>
        <meta name="description" content="Raiku Validator Public Performance Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-black backdrop-blur-xl border-b border-[#accf4c]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-xl flex items-center justify-center shadow-lg shadow-[#accf4c]/30 border border-[#accf4c]/20">
              <img src="/raiku.jpg" alt="Raiku Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#accf4c]">Raiku Community Portal</h1>
              <p className="text-xs sm:text-sm text-gray-400">Transparent Validator Performance</p>
            </div>
          </div>
          <a 
            href="/"
            className="px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs sm:text-sm font-medium w-fit"
          >
            Back to Dashboard
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 sm:mb-4">Welcome, Delegators!</h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto">
            Monitor Raiku Validator's performance, reliability, and earnings. We believe in full transparency to build trust with our community.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-[#accf4c]/20 text-center">
            <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-2">Uptime (30D)</h3>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#accf4c]">{publicMetrics.uptime}%</p>
          </div>
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-blue-500/20 text-center">
            <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-2">Current APY</h3>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400">{publicMetrics.apy}%</p>
          </div>
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-purple-500/20 text-center">
            <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-2">Reliability Score</h3>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-400">{publicMetrics.reliability}%</p>
          </div>
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-yellow-500/20 text-center">
            <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-2">Total Stake</h3>
            <p className="text-lg sm:text-2xl lg:text-4xl font-bold text-yellow-400">{formatNumber(publicMetrics.totalStake)} SOL</p>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-green-500/20 text-center">
            <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-2">Vote Success Rate</h3>
            <p className="text-2xl sm:text-3xl font-bold text-green-400">{publicMetrics.voteSuccess}%</p>
          </div>
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-red-500/20 text-center">
            <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-2">Skipped Slots</h3>
            <p className="text-2xl sm:text-3xl font-bold text-red-400">{publicMetrics.skippedSlots}%</p>
          </div>
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-indigo-500/20 text-center">
            <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-2">Active Delegators</h3>
            <p className="text-2xl sm:text-3xl font-bold text-indigo-400">{publicMetrics.delegatorCount}</p>
          </div>
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-[#accf4c]/20">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Uptime Trend (30 Days)</h3>
            <div className="h-48 sm:h-64">
              <Line data={uptimeData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-blue-500/20">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">APY Trend (30 Days)</h3>
            <div className="h-48 sm:h-64">
              <Line data={apyData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Stake Growth Chart */}
        <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-purple-500/20 mb-8 sm:mb-12">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Stake Growth (30 Days)</h3>
          <div className="h-48 sm:h-64">
            <Line data={stakeData} options={{
              ...chartOptions,
              scales: {
                ...chartOptions.scales,
                y: {
                  ...chartOptions.scales.y,
                  ticks: {
                    ...chartOptions.scales.y.ticks,
                    callback: function(value) {
                      return formatNumber(value);
                    }
                  }
                }
              }
            }} />
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-green-500/20 mb-8 sm:mb-12">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white text-center">Why Choose Raiku?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl mb-2">🔒</div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-2">Secure & Reliable</h4>
              <p className="text-xs sm:text-sm text-gray-300">99.97% uptime with enterprise-grade security</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl mb-2">📊</div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-2">Transparent</h4>
              <p className="text-xs sm:text-sm text-gray-300">Real-time performance metrics and open communication</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl mb-2">💰</div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-2">Profitable</h4>
              <p className="text-xs sm:text-sm text-gray-300">Competitive APY with consistent returns</p>
            </div>
          </div>
        </div>

        {/* Contact & Resources */}
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Connect with Raiku</h3>
          <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
            Have questions or want to learn more? Reach out to us!
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6">
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base">Website</a>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base">Twitter</a>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base">Discord</a>
          </div>
        </div>
      </main>
    </div>
  );
}