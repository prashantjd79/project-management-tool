const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const protect = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

router.post('/', protect, createTask);
router.get('/', protect, getTasks);
router.put('/:taskId', protect, updateTask);
router.delete('/:taskId', protect, deleteTask);

module.exports = router;
