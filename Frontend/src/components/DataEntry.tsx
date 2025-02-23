import React, { useState } from 'react';
import { 
  Clipboard, Camera, Gauge, Save, Plus, 
  AlertTriangle, CheckCircle, Thermometer,
  Droplets, Wind, Scale, Activity
} from 'lucide-react';
import { format } from 'date-fns';
import type { ManualInspection, SensorData } from '../types';
import PredictionReport from './PredictionReport';

const DataEntry = () => {
  const [activeTab, setActiveTab] = useState<'manual' | 'sensor'>('manual');
  const [showSuccess, setShowSuccess] = useState(false);
  const [manualData, setManualData] = useState<Partial<ManualInspection>>({
    pulleyId: '',
    inspector: '',
    temperature: 25,
    humidity: 50,
    speed: 100,
    tension: 1000,
    force: 500,
    bearingTemperature: 40,
    surfaceWear: 'none',
    beltTracking: 'centered',
    bearingCondition: 'good',
    lubricationStatus: 'adequate',
    visualCondition: 'good',
    noiseLevel: 'normal',
    beltAlignment: 'aligned',
    notes: ''
  });

  const [sensorData, setSensorData] = useState<Partial<SensorData>>({
    pulleyId: '',
    temperature: 0,
    vibration: 0,
    speed: 0,
    loadPercentage: 0
  });

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting manual inspection:', manualData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSensorUpdate = () => {
    setSensorData(prev => ({
      ...prev,
      temperature: Math.round((45 + Math.random() * 15) * 10) / 10,
      vibration: Math.round((2 + Math.random() * 3) * 10) / 10,
      speed: Math.round((120 + Math.random() * 30) * 10) / 10,
      loadPercentage: Math.round((70 + Math.random() * 20) * 10) / 10
    }));
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Pulley Inspection Data Entry</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('manual')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === 'manual'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Clipboard className="w-4 h-4 mr-2" />
              Manual Entry
            </button>
            <button
              onClick={() => setActiveTab('sensor')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === 'sensor'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Camera className="w-4 h-4 mr-2" />
              Sensor Data
            </button>
          </div>
        </div>

        {showSuccess && (
          <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Data saved successfully!
          </div>
        )}

        {activeTab === 'manual' ? (
          <form onSubmit={handleManualSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pulley ID
                </label>
                <select
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={manualData.pulleyId}
                  onChange={e => setManualData(prev => ({ ...prev, pulleyId: e.target.value }))}
                  required
                >
                  <option value="">Select Pulley</option>
                  <option value="1">Head Pulley A1</option>
                  <option value="2">Tail Pulley B2</option>
                  <option value="3">Bend Pulley C3</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inspector Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={manualData.inspector}
                  onChange={e => setManualData(prev => ({ ...prev, inspector: e.target.value }))}
                  required
                />
              </div>
            </div>

            {/* Measurements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Thermometer className="w-4 h-4 mr-1" />
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={manualData.temperature}
                  onChange={e => setManualData(prev => ({ ...prev, temperature: Number(e.target.value) }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Droplets className="w-4 h-4 mr-1" />
                  Humidity (%)
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={manualData.humidity}
                  onChange={e => setManualData(prev => ({ ...prev, humidity: Number(e.target.value) }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Wind className="w-4 h-4 mr-1" />
                  Speed (RPM)
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={manualData.speed}
                  onChange={e => setManualData(prev => ({ ...prev, speed: Number(e.target.value) }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Scale className="w-4 h-4 mr-1" />
                  Tension (N)
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={manualData.tension}
                  onChange={e => setManualData(prev => ({ ...prev, tension: Number(e.target.value) }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Activity className="w-4 h-4 mr-1" />
                  Force (N)
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={manualData.force}
                  onChange={e => setManualData(prev => ({ ...prev, force: Number(e.target.value) }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Thermometer className="w-4 h-4 mr-1" />
                  Bearing Temperature (°C)
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={manualData.bearingTemperature}
                  onChange={e => setManualData(prev => ({ ...prev, bearingTemperature: Number(e.target.value) }))}
                  required
                />
              </div>
            </div>

            {/* Condition Assessments */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Surface Wear
                </label>
                <select
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={manualData.surfaceWear}
                  onChange={e => setManualData(prev => ({ ...prev, surfaceWear: e.target.value as any }))}
                  required
                >
                  <option value="none">None</option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Belt Tracking
                </label>
                <select
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={manualData.beltTracking}
                  onChange={e => setManualData(prev => ({ ...prev, beltTracking: e.target.value as any }))}
                  required
                >
                  <option value="centered">Centered</option>
                  <option value="slight-offset">Slight Offset</option>
                  <option value="significant-offset">Significant Offset</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bearing Condition
                </label>
                <select
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={manualData.bearingCondition}
                  onChange={e => setManualData(prev => ({ ...prev, bearingCondition: e.target.value as any }))}
                  required
                >
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lubrication Status
                </label>
                <select
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={manualData.lubricationStatus}
                  onChange={e => setManualData(prev => ({ ...prev, lubricationStatus: e.target.value as any }))}
                  required
                >
                  <option value="adequate">Adequate</option>
                  <option value="low">Low</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visual Condition
                </label>
                <select
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={manualData.visualCondition}
                  onChange={e => setManualData(prev => ({ ...prev, visualCondition: e.target.value as any }))}
                  required
                >
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Noise Level
                </label>
                <select
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={manualData.noiseLevel}
                  onChange={e => setManualData(prev => ({ ...prev, noiseLevel: e.target.value as any }))}
                  required
                >
                  <option value="normal">Normal</option>
                  <option value="concerning">Concerning</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={4}
                value={manualData.notes}
                onChange={e => setManualData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Enter any additional observations or concerns..."
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Inspection
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pulley ID
                </label>
                <select
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={sensorData.pulleyId}
                  onChange={e => setSensorData(prev => ({ ...prev, pulleyId: e.target.value }))}
                >
                  <option value="">Select Pulley</option>
                  <option value="1">Head Pulley A1</option>
                  <option value="2">Tail Pulley B2</option>
                  <option value="3">Bend Pulley C3</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleSensorUpdate}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  <Gauge className="w-4 h-4 mr-2" />
                  Read Sensor Data
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Temperature</div>
                <div className="text-2xl font-semibold">
                  {sensorData.temperature}°C
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Vibration</div>
                <div className="text-2xl font-semibold">
                  {sensorData.vibration} mm/s
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Speed</div>
                <div className="text-2xl font-semibold">
                  {sensorData.speed} RPM
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Load</div>
                <div className="text-2xl font-semibold">
                  {sensorData.loadPercentage}%
                </div>
              </div>
            </div>

            {sensorData.temperature > 55 && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                High temperature detected! Immediate attention required.
              </div>
            )}
          </div>
        )}
      </div>
      
      {activeTab === 'manual' && manualData.pulleyId && (
        <PredictionReport inspection={manualData} />
      )}
    </>
  );
};

export default DataEntry;