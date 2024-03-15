import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    if (err.code) {
        if (err.code === '22P02') {
            res.status(400).json({ message: 'Error de inserción de tipo inválido' });
            return;
        } else if (err.code === '23505') {
            res.status(400).json({ message: 'La clave primaria ya existe' });
            return;
        }
    }
    console.error('Error:', err);
    res.status(500).send('Error interno del servidor');
    return;
};

export default errorHandler;
