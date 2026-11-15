import Task from '../models/taskModel.js';



// ======================================
const getAllTasks = async (req, res) => {

    try {

        const filter = {};

        // ============================
        if (req.query.completed !== undefined) {
            
            if (req.query.completed !== 'true' && req.query.completed !== 'false') {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Completed must be true or false'
                })
            };

            filter.completed = req.query.completed === "true";
        };
        

        // ============================
        const tasks = await Task.find(filter);

        res.status(200).json({
            status: 'success',
            results: tasks.length,
            data: {
                tasks,
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: 'error',
            message: 'Could not load tasks',
        });
    }

}



// ======================================
const createTask = async (req, res) => {

    try {

        const { title, description, priority } = req.body;

        const task = await Task.create({ title, description, priority });

        res.status(201).json({
            status: 'success',
            data: {
                task,
            }
        })

    } catch (error) {

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                status: 'fail',
                message: error.message,
            })
        }

        console.error(error);

        res.status(500).json({
            status: 'error',
            message: 'Could not create task',
        });
    }
}



// ======================================
const updateTask = async (req, res) => {

    try {

        const updates = {};
        const allowedFields = ['title', 'description', 'priority', 'completed'];

        for (const field of allowedFields) {

            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        };


        const task = await Task.findByIdAndUpdate(req.params.id, updates, {
            returnDocument: 'after',
            runValidators: true,
        })


        if (!task) {
            return res.status(404).json({
                status: "fail",
                message: "Task not found",
            });
        }


        res.status(200).json({
            status: 'success',
            data: {
                task,
            }
        });

    } catch (error) {

        if (error.name === "ValidationError" || error.name === "CastError") {
            return res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }

        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Could not update task",
        });
    }
}



// ======================================
const deleteTask = async (req, res) => {

    try {

        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                status: 'fail',
                message: 'Task not found',
            })
        };

        res.status(204).send();

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                status: "fail",
                message: "Invalid task ID",
            });
        }

        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Could not delete task",
        });
    }
}





export { getAllTasks, createTask, updateTask, deleteTask };



























