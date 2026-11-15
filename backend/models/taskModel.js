import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Task title is required"],
        trim: true,
        minlength: [1, "Task title cannot be empty"],
        maxlength: [100, "Task title cannot exceed 100 characters"],
    },

    description: {
        type: String,
        trim: true,
        maxlength: [500,  "Description cannot exceed 500 characters"],
        default: '',
    },

    priority: {
        type: String,
        enum: {
            values: ["low", "medium", "high"],
            message: 'Priority must be low, medium or high',
        },
        default: 'medium'
    },

    completed: {
        type: Boolean,
        default: false,
    }
});



const Task = mongoose.model('Task', taskSchema);


export default Task;






















