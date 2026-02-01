import express from 'express';
import tasksRoutes from './routes/tasksRoutes.js';
import { connectDB } from '../config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5001;


//middlewares
app.use(express.json());
app.use(cors({origin: 'http://localhost:5173'}));

//routes
app.use('/api/tasks', tasksRoutes);

//start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  }); 
});



