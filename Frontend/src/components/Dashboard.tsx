import { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import { AlertTriangle, CheckCircle, XCircle, ThermometerSun, Activity, Clock, PenTool as Tool } from 'lucide-react';
import { format } from 'date-fns';
import { PulleyData, PerformanceMetric } from '../types';
import { getPulleys } from '../api'; // Import the API function

const Dashboard = () => {
  const [pulleys, setPulleys] = useState<PulleyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch pulley data from the backend
  useEffect(() => {
    const fetchPulleys = async () => {
      try {
        const data = await getPulleys();
        setPulleys(data);
      } catch (err) {
        setError('Failed to fetch pulley data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPulleys();
  }, []);

  // Mock performance data (replace with real API call if available)
  const mockPerformanceData: PerformanceMetric[] = Array.from({ length: 24 }, (_, i) => ({
    timestamp: format(new Date(Date.now() - i * 3600000), 'HH:mm'),
    efficiency: 85 + Math.random() * 10,
    temperature: 45 + Math.random() * 5,
    vibration: 2 + Math.random()
  })).reverse();

  const StatusIcon = ({ status }: { status: PulleyData['status'] }) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case 'critical':
        return <XCircle className="w-6 h-6 text-red-500" />;
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 p-6">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-50 p-6">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Conveyor System Dashboard</h1>
        <p className="text-gray-600">Real-time monitoring and analytics</p>
      </header>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">System Status</h2>
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold text-yellow-500">93.5%</div>
          <p className="text-gray-600">Overall System Health</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Active Alerts</h2>
            <Activity className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-3xl font-bold text-red-500">2</div>
          <p className="text-gray-600">Requiring Attention</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Next Maintenance</h2>
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-blue-500">48h</div>
          <p className="text-gray-600">Until Scheduled Service</p>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">System Performance</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="efficiency"
                stroke="#3b82f6"
                name="Efficiency (%)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="temperature"
                stroke="#ef4444"
                name="Temperature (°C)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="vibration"
                stroke="#eab308"
                name="Vibration (mm/s)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pulley Status */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Pulley Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pulleys.map((pulley) => (
            <div
              key={pulley.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{pulley.name}</h3>
                <StatusIcon status={pulley.status} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <ThermometerSun className="w-4 h-4 mr-2" />
                    Temperature
                  </div>
                  <span className={`font-medium ${
                    pulley.temperature > 55 ? 'text-red-500' :
                    pulley.temperature > 50 ? 'text-yellow-500' :
                    'text-green-500'
                  }`}>
                    {pulley.temperature}°C
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Activity className="w-4 h-4 mr-2" />
                    Vibration
                  </div>
                  <span className={`font-medium ${
                    pulley.vibration > 4 ? 'text-red-500' :
                    pulley.vibration > 3 ? 'text-yellow-500' :
                    'text-green-500'
                  }`}>
                    {pulley.vibration} mm/s
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Tool className="w-4 h-4 mr-2" />
                    Next Service
                  </div>
                  <span className="font-medium">
                    {format(new Date(pulley.nextMaintenance), 'MMM dd')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;