const express = require('express');
const router = express.Router();
const {
    getTasks,
    createTask,
    updateTask, 
    deleteTask
} = require('../controllers/taskController.jsx');

const { protect } = require('../middleware/authMiddleware');


router.route('/')
    .get(protect, getTasks).post(protect, createTask);
router.route('/:id')
    .put(protect, updateTask)   
    .delete(protect, deleteTask);

    module.exports = router;

// This code defines the routes for task management in a Node.js application using Express.
// It imports the necessary modules, sets up the routes for getting, creating, updating, and deleting tasks,
// and applies authentication middleware to protect these routes. The tasks are associated with a user, ensuring                