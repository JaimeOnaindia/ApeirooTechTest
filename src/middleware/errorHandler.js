"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    // Si el error es un error de validación de pg-promise (por ejemplo, una consulta fallida)
    if (err.code) {
        // Error de inserción de tipo inválido
        if (err.code === '22P02') {
            res.status(400).json({ message: 'Error de inserción de tipo inválido' }); // Bad Request (400)
        }
        // Error de relación o columna no encontrada
        else if (err.code === '42P01' || err.code === '42703') {
            res.status(400).json({ message: 'Error de relación o columna no encontrada' }); // Bad Request (400)
        }
    }
    // Si el error no es un error de validación de pg-promise, devolver un error 500 (Internal Server Error)
    console.error('Error:', err);
    res.status(500).send('Error interno del servidor');
};
exports.default = errorHandler;
