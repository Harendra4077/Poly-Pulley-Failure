import { Request, Response } from 'express';
import Pulley from '../models/Pulley';

export const getPulleys = async (req: Request, res: Response) => {
  try {
    const pulleys = await Pulley.find();
    res.json(pulleys);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const createPulley = async (req: Request, res: Response) => {
  const pulley = new Pulley(req.body);
  try {
    const newPulley = await pulley.save();
    res.status(201).json(newPulley);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

// Add more controller methods as needed