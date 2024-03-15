import express from 'express';
import bodyParser from 'body-parser';
import dutyRoutes from './routes/dutyRoutes';
import errorHandler from './middleware/errorHandler';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/duties', dutyRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
