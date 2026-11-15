import app from './app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import process from "node:process";


dotenv.config({ path: './config.env' });


mongoose.connect(process.env.DATEBASE)
    .then(() => {
        console.log('Datebase connected');

        app.listen(8000, () => {
            console.log('Server is running on port 8000...');
        })
    })
    .catch((err) => {
        console.error("Database connection failed:", err.message);
    })



