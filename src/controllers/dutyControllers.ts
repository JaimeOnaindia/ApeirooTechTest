import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../config/databaseConfig';


interface Duty {
  id: string;
  name: string;
}

export const createDuty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name }: { name: string } = req.body;
    const id = uuidv4();
    await db.none('INSERT INTO duties (id, name) VALUES ($1, $2)', [id, name]);
    res.status(201).json({ id, name });
  } catch (error) {
    console.error('Error creando el Duty:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export const getAllDuties = async (_req: Request, res: Response): Promise<void> => {
  try {
    const duties: Duty[] = await db.any('SELECT * FROM duties');
    res.json(duties);
  } catch (error) {
    console.error('Error obteniendo los Duties:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export const getDutyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const duty: Duty | null = await db.oneOrNone('SELECT * FROM duties WHERE id = $1', id);
    if (duty) {
      res.json(duty);
    } else {
      res.status(404).send('Duty no encontrado');
    }
  } catch (error) {
    console.error('Error obteniendo el Duty:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export const updateDuty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name }: { name: string } = req.body;
    await db.none('UPDATE duties SET name = $1 WHERE id = $2', [name, id]);
    res.json({ id, name });
  } catch (error) {
    console.error('Error actualizando el Duty:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export const deleteDuty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await db.none('DELETE FROM duties WHERE id = $1', id);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error eliminando el Duty:', error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = {
  getAllDuties,
  getDutyById,
  createDuty,
  updateDuty,
  deleteDuty
};
