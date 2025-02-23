import mongoose, { Document, Schema } from 'mongoose';

export interface IPulley extends Document {
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  temperature: number;
  vibration: number;
  lastMaintenance: Date;
  nextMaintenance: Date;
  runtime: number;
}

const PulleySchema: Schema = new Schema({
  name: { type: String, required: true },
  status: { type: String, required: true, enum: ['healthy', 'warning', 'critical'] },
  temperature: { type: Number, required: true },
  vibration: { type: Number, required: true },
  lastMaintenance: { type: Date, required: true },
  nextMaintenance: { type: Date, required: true },
  runtime: { type: Number, required: true },
});

export default mongoose.model<IPulley>('Pulley', PulleySchema);