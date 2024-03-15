import express from 'express';
import bodyParser from 'body-parser';
import dutyRoutes from './routes/dutyRoutes';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/duties', dutyRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
