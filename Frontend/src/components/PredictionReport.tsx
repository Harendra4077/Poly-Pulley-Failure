import React from 'react';
import { AlertTriangle, Clock, PenTool as Tool, Activity, ThermometerSun, AlertCircle, Gauge, BarChart, Settings, Wrench } from 'lucide-react';
import type { ManualInspection, PulleyPrediction } from '../types';

interface PredictionReportProps {
  inspection: Partial<ManualInspection>;
}

const PredictionReport: React.FC<PredictionReportProps> = ({ inspection }) => {
  const generatePrediction = (data: Partial<ManualInspection>): PulleyPrediction => {
    let failureProbability = 0;
    const criticalFactors = [];
    const recommendedActions = [];
    const potentialFailureModes = [];

    // Temperature analysis
    if (data.temperature && data.temperature > 60) {
      failureProbability += 0.3;
      criticalFactors.push('High operating temperature');
      recommendedActions.push('Implement additional cooling measures');
      potentialFailureModes.push('Thermal damage to bearings');
    } else if (data.temperature && data.temperature > 50) {
      failureProbability += 0.15;
      criticalFactors.push('Elevated temperature');
      recommendedActions.push('Monitor temperature trends');
    }

    // Bearing temperature
    if (data.bearingTemperature && data.bearingTemperature > 70) {
      failureProbability += 0.35;
      criticalFactors.push('Critical bearing temperature');
      recommendedActions.push('Immediate bearing inspection required');
      potentialFailureModes.push('Bearing seizure');
    } else if (data.bearingTemperature && data.bearingTemperature > 60) {
      failureProbability += 0.2;
      criticalFactors.push('High bearing temperature');
      recommendedActions.push('Check bearing lubrication');
    }

    // Speed analysis
    if (data.speed && data.speed > 150) {
      failureProbability += 0.25;
      criticalFactors.push('Excessive speed');
      recommendedActions.push('Reduce operating speed');
      potentialFailureModes.push('Mechanical wear acceleration');
    }

    // Tension and force
    if (data.tension && data.tension > 1500) {
      failureProbability += 0.3;
      criticalFactors.push('High belt tension');
      recommendedActions.push('Adjust belt tension');
      potentialFailureModes.push('Belt stress failure');
    }

    // Surface wear
    if (data.surfaceWear === 'severe') {
      failureProbability += 0.4;
      criticalFactors.push('Severe surface wear');
      recommendedActions.push('Schedule pulley replacement');
      potentialFailureModes.push('Surface degradation');
    } else if (data.surfaceWear === 'moderate') {
      failureProbability += 0.2;
      criticalFactors.push('Moderate surface wear');
      recommendedActions.push('Increase inspection frequency');
    }

    // Belt tracking
    if (data.beltTracking === 'significant-offset') {
      failureProbability += 0.35;
      criticalFactors.push('Significant belt misalignment');
      recommendedActions.push('Immediate belt alignment required');
      potentialFailureModes.push('Uneven wear pattern');
    }

    // Bearing condition
    if (data.bearingCondition === 'poor') {
      failureProbability += 0.4;
      criticalFactors.push('Poor bearing condition');
      recommendedActions.push('Replace bearings');
      potentialFailureModes.push('Bearing failure');
    }

    // Lubrication
    if (data.lubricationStatus === 'critical') {
      failureProbability += 0.35;
      criticalFactors.push('Critical lubrication level');
      recommendedActions.push('Immediate lubrication required');
      potentialFailureModes.push('Insufficient lubrication');
    }

    // Cap probability at 0.95
    failureProbability = Math.min(failureProbability, 0.95);

    // Calculate risk level
    let riskLevel: PulleyPrediction['riskLevel'] = 'low';
    if (failureProbability > 0.7) riskLevel = 'critical';
    else if (failureProbability > 0.5) riskLevel = 'high';
    else if (failureProbability > 0.3) riskLevel = 'medium';

    // Calculate maintenance urgency
    let maintenanceUrgency: PulleyPrediction['maintenanceUrgency'] = 'routine';
    if (failureProbability > 0.7) maintenanceUrgency = 'immediate';
    else if (failureProbability > 0.5) maintenanceUrgency = 'urgent';
    else if (failureProbability > 0.3) maintenanceUrgency = 'soon';

    // Estimate lifespan in days based on current conditions
    const baseLifespan = 365; // Base lifespan of 1 year
    const estimatedLifespan = Math.round(baseLifespan * (1 - failureProbability));

    // Calculate health score (0-100)
    const healthScore = Math.round((1 - failureProbability) * 100);

    return {
      failureProbability,
      estimatedLifespan,
      criticalFactors,
      recommendedActions,
      riskLevel,
      confidenceScore: 0.85,
      maintenanceUrgency,
      potentialFailureModes,
      healthScore,
      temperatureAnalysis: {
        status: data.temperature && data.temperature > 60 ? 'critical' :
               data.temperature && data.temperature > 50 ? 'warning' : 'normal',
        trend: 'stable' // In a real system, this would be calculated from historical data
      },
      vibrationAnalysis: {
        status: 'normal', // This would be based on vibration sensor data
        trend: 'stable'
      }
    };
  };

  const prediction = generatePrediction(inspection);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      default: return 'text-green-500';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'immediate': return 'text-red-600';
      case 'urgent': return 'text-orange-500';
      case 'soon': return 'text-yellow-500';
      default: return 'text-green-500';
    }
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <Activity className="w-6 h-6 mr-2" />
        Pulley Failure Prediction Report
      </h2>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-1" />
            Failure Probability
          </div>
          <div className="text-2xl font-semibold">
            {Math.round(prediction.failureProbability * 100)}%
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1 flex items-center">
            <Gauge className="w-4 h-4 mr-1" />
            Health Score
          </div>
          <div className="text-2xl font-semibold">
            {prediction.healthScore}/100
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            Risk Level
          </div>
          <div className={`text-2xl font-semibold ${getRiskColor(prediction.riskLevel)}`}>
            {prediction.riskLevel.charAt(0).toUpperCase() + prediction.riskLevel.slice(1)}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1 flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Maintenance
          </div>
          <div className={`text-2xl font-semibold ${getUrgencyColor(prediction.maintenanceUrgency)}`}>
            {prediction.maintenanceUrgency.charAt(0).toUpperCase() + prediction.maintenanceUrgency.slice(1)}
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1 flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Estimated Lifespan
          </div>
          <div className="text-2xl font-semibold">
            {prediction.estimatedLifespan} days
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1 flex items-center"> Continuing the PredictionReport.tsx file content exactly where it left off:

            <ThermometerSun className="w-4 h-4 mr-1" />
            Temperature Status
          </div>
          <div className={`text-2xl font-semibold ${
            prediction.temperatureAnalysis.status === 'critical' ? 'text-red-600' :
            prediction.temperatureAnalysis.status === 'warning' ? 'text-yellow-500' :
            'text-green-500'
          }`}>
            {prediction.temperatureAnalysis.status.charAt(0).toUpperCase() + 
             prediction.temperatureAnalysis.status.slice(1)}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1 flex items-center">
            <BarChart className="w-4 h-4 mr-1" />
            Confidence Score
          </div>
          <div className="text-2xl font-semibold">
            {Math.round(prediction.confidenceScore * 100)}%
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1 flex items-center">
            <Settings className="w-4 h-4 mr-1" />
            Vibration Status
          </div>
          <div className={`text-2xl font-semibold ${
            prediction.vibrationAnalysis.status === 'critical' ? 'text-red-600' :
            prediction.vibrationAnalysis.status === 'warning' ? 'text-yellow-500' :
            'text-green-500'
          }`}>
            {prediction.vibrationAnalysis.status.charAt(0).toUpperCase() + 
             prediction.vibrationAnalysis.status.slice(1)}
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Critical Factors
          </h3>
          <ul className="space-y-2">
            {prediction.criticalFactors.map((factor, index) => (
              <li key={index} className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                {factor}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Tool className="w-5 h-5 mr-2" />
            Recommended Actions
          </h3>
          <ul className="space-y-2">
            {prediction.recommendedActions.map((action, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                {action}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Wrench className="w-5 h-5 mr-2" />
            Potential Failure Modes
          </h3>
          <ul className="space-y-2">
            {prediction.potentialFailureModes.map((mode, index) => (
              <li key={index} className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                {mode}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Trend Analysis
          </h3>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-600">Temperature Trend</div>
              <div className="flex items-center mt-1">
                <div className={`h-2 w-full rounded ${
                  prediction.temperatureAnalysis.trend === 'increasing' ? 'bg-red-200' :
                  prediction.temperatureAnalysis.trend === 'decreasing' ? 'bg-green-200' :
                  'bg-blue-200'
                }`}>
                  <div className={`h-2 rounded ${
                    prediction.temperatureAnalysis.trend === 'increasing' ? 'bg-red-500' :
                    prediction.temperatureAnalysis.trend === 'decreasing' ? 'bg-green-500' :
                    'bg-blue-500'
                  }`} style={{ width: '60%' }}></div>
                </div>
                <span className="ml-2 text-sm">
                  {prediction.temperatureAnalysis.trend.charAt(0).toUpperCase() + 
                   prediction.temperatureAnalysis.trend.slice(1)}
                </span>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600">Vibration Trend</div>
              <div className="flex items-center mt-1">
                <div className={`h-2 w-full rounded ${
                  prediction.vibrationAnalysis.trend === 'increasing' ? 'bg-red-200' :
                  prediction.vibrationAnalysis.trend === 'decreasing' ? 'bg-green-200' :
                  'bg-blue-200'
                }`}>
                  <div className={`h-2 rounded ${
                    prediction.vibrationAnalysis.trend === 'increasing' ? 'bg-red-500' :
                    prediction.vibrationAnalysis.trend === 'decreasing' ? 'bg-green-500' :
                    'bg-blue-500'
                  }`} style={{ width: '40%' }}></div>
                </div>
                <span className="ml-2 text-sm">
                  {prediction.vibrationAnalysis.trend.charAt(0).toUpperCase() + 
                   prediction.vibrationAnalysis.trend.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionReport;