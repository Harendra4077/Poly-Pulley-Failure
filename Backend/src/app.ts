import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import pulleyRoutes from './routes/pulleyRoutes';
import maintenanceRoutes from './routes/maintenanceRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI as string;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/pulleys', pulleyRoutes);
app.use('/api/maintenance', maintenanceRoutes);

export default app;