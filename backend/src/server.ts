import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routers/userRoutes';
import eventRoutes from './routers/eventRoutes';
import ticketRoutes from './routers/ticketRoutes';

import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config()

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use('/api/users', userRoutes);
app.use('/api', eventRoutes);
app.use('/api/tickets', ticketRoutes);



 
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});
  
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  }
);