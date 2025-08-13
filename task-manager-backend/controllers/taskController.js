const mongoose = require('mongoose');

const Task = require('../models/Task');


// @desc   Get all tasks for logged-in user
// @route  GET /api/tasks
// @access Private

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

// @desc   Create a new task
// @route  POST /api/tasks  

// @access Private
const createTask = async (req, res) => {
  const { title } = req.body;
  try {
    const task = new Task({
      title,
      user: req.user._id,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(400).json({ message: 'Invalid task data' });
  }
}   


// @desc   Update a task
// @route  PUT /api/tasks/:id   
// @access Private
const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ _id: id, user: req.user._id});

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

   task.title = req.body.title ?? task.title;
   task.completed = req.body.completed ?? task.completed;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: 'Invalid task data' });
  }

}
// @desc   Delete a task
// @route  DELETE /api/tasks/:id    
// @access Private
const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Task ID' });
  }

  try {
    const deleted = await Task.deleteOne({ _id: id, user: req.user._id });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};