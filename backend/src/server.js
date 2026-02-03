import express from 'express';
import tasksRoutes from './routes/tasksRoutes.js';
import { connectDB } from '../config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

import path from "path";  

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();


//middlewares
app.use(express.json());

if(process.env.NODE_ENV !== 'production'){
  app.use(cors({origin: 'http://localhost:5173'}));

}

//routes
app.use('/api/tasks', tasksRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.send(path.join(__dirname, "../frontend/dist/index.html"));
  })
}

//start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  }); 
});



