import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    if (err.code) {
        if (err.code === '22P02') {
            res.status(400).json({ message: 'Error de inserción de tipo inválido' }); // Bad Request (400)
        }
    }
    console.error('Error:', err);
    res.status(500).send('Error interno del servidor');
};

export default errorHandler;
