import express from 'express';
import cors from 'cors';
import taskRouter from './routes/taskRoutes.js';


const app = express();

app.use(cors({ origin: "https://daylist-3x37.onrender.com" }));

app.use(express.json());



app.use('/api/v1/tasks', taskRouter);



export default app;

























