const express = require('express');
const { createProject, getUserProjects, updateProject, deleteProject } = require('../controllers/projectController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createProject);
router.get('/', protect, getUserProjects);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
