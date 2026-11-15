import express from 'express';
import taskRouter from './routes/taskRoutes.js';


const app = express();
app.use(express.json());



app.use('/api/v1/tasks', taskRouter);
// app.get('/api/v1/health', (req, res) => {
    
//     res.status(200).json({
//         status: 'success',
//         message: 'Daylist API is running'
//     })
// })


export default app;

























