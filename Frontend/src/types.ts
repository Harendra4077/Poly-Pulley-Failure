export interface PulleyData {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  temperature: number;
  vibration: number;
  lastMaintenance: string;
  nextMaintenance: string;
  runtime: number;
}

export interface MaintenanceLog {
  id: string;
  pulleyId: string;
  date: string;
  type: 'routine' | 'emergency';
  description: string;
  technician: string;
}

export interface PerformanceMetric {
  timestamp: string;
  efficiency: number;
  temperature: number;
  vibration: number;
}

export interface SensorData {
  id: string;
  pulleyId: string;
  timestamp: string;
  temperature: number;
  vibration: number;
  speed: number;
  loadPercentage: number;
}

export interface ManualInspection {
  id: string;
  pulleyId: string;
  inspectionDate: string;
  inspector: string;
  temperature: number;
  humidity: number;
  speed: number;
  tension: number;
  force: number;
  bearingTemperature: number;
  surfaceWear: 'none' | 'light' | 'moderate' | 'severe';
  beltTracking: 'centered' | 'slight-offset' | 'significant-offset';
  bearingCondition: 'good' | 'fair' | 'poor';
  lubricationStatus: 'adequate' | 'low' | 'critical';
  visualCondition: 'good' | 'fair' | 'poor';
  noiseLevel: 'normal' | 'concerning' | 'critical';
  beltAlignment: 'aligned' | 'slight-deviation' | 'severe-deviation';
  notes: string;
}

export interface PulleyPrediction {
  failureProbability: number;
  estimatedLifespan: number;
  criticalFactors: string[];
  recommendedActions: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  confidenceScore: number;
  maintenanceUrgency: 'routine' | 'soon' | 'urgent' | 'immediate';
  potentialFailureModes: string[];
  healthScore: number;
  temperatureAnalysis: {
    status: 'normal' | 'warning' | 'critical';
    trend: 'stable' | 'increasing' | 'decreasing';
  };
  vibrationAnalysis: {
    status: 'normal' | 'warning' | 'critical';
    trend: 'stable' | 'increasing' | 'decreasing';
  };
}