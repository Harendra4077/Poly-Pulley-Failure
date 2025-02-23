import { Request, Response } from 'express';
import MaintenanceLog from '../models/MaintenanceLog';

export const getMaintenanceLogs = async (req: Request, res: Response) => {
  try {
    const maintenanceLogs = await MaintenanceLog.find();
    res.json(maintenanceLogs);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const createMaintenanceLog = async (req: Request, res: Response) => {
  const maintenanceLog = new MaintenanceLog(req.body);
  try {
    const newMaintenanceLog = await maintenanceLog.save();
    res.status(201).json(newMaintenanceLog);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};