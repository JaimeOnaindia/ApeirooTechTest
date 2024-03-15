import { Request, Response, NextFunction } from 'express';
import db from '../config/databaseConfig';
import Duty from '../models/duty';


export const createDuty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id, name }: { id: number, name: string } = req.body;
    await db.none('INSERT INTO duties (id, name) VALUES ($1, $2)', [id, name]);
    res.status(201).json({'created': true, id, name });
  } catch (error) {
    next(error);
  }
};

export const getAllDuties = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const duties: Duty[] = await db.any('SELECT * FROM duties');
    res.json(duties);
  } catch (error) {
    next(error);
  }
};

export const getDutyById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const duty: Duty | null = await db.oneOrNone('SELECT * FROM duties WHERE id = $1', id);
    if (duty) {
      res.json(duty);
    } else {
      res.status(404).json({message: 'Duty no encontrado'});
    }
  } catch (error) {
    next(error);
  }
};

export const updateDuty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { name }: { name: string } = req.body;
    await db.none('UPDATE duties SET name = $1 WHERE id = $2', [name, id]);
    res.json({'created': true, id, name });
  } catch (error) {
    next(error);
  }
};

export const deleteDuty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await db.none('DELETE FROM duties WHERE id = $1', id);
    res.json({'deleted': 1});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDuties,
  getDutyById,
  createDuty,
  updateDuty,
  deleteDuty
};
