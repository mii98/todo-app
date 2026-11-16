import app from './app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import process from "node:process";


dotenv.config({ path: './config.env' });


mongoose.connect(process.env.DATEBASE)
    .then(() => {
        console.log('Datebase connected');

        const port = Number(process.env.PORT || 8000);

        app.listen(port, '0.0.0.0', () => {
            console.log(`Server is running on port ${port}...`);
        })
    })
    .catch((err) => {
        console.error("Database connection failed:", err.message);
    })



