import mongoose, { Document, Schema } from 'mongoose';

export interface IMaintenanceLog extends Document {
  pulleyId: string;
  date: Date;
  type: 'routine' | 'emergency';
  description: string;
  technician: string;
}

const MaintenanceLogSchema: Schema = new Schema({
  pulleyId: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true, enum: ['routine', 'emergency'] },
  description: { type: String, required: true },
  technician: { type: String, required: true },
});

export default mongoose.model<IMaintenanceLog>('MaintenanceLog', MaintenanceLogSchema);