import express from 'express';
import taskRouter from './routes/taskRoutes.js';


const app = express();
app.use(express.json());



app.use('/api/v1/tasks', taskRouter);



export default app;

























