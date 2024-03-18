import express from 'express';
import bodyParser from 'body-parser';
import dutyRoutes from './routes/dutyRoutes';
import errorHandler from './middleware/errorHandler';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());

app.use(bodyParser.json());

app.use('/duties', dutyRoutes);

app.use(errorHandler);

export default app;
