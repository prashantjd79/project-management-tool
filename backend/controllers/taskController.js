const Task = require('../models/Task');
const Project = require('../models/Project');


exports.createTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const projectId = req.params.projectId;

  try {
    const project = await Project.findOne({ _id: projectId, user: req.user._id });
    if (!project) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    const task = await Task.create({
      project: projectId,
      title,
      description,
      status,
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getTasks = async (req, res) => {
  const { status } = req.query;
  const projectId = req.params.projectId;

  try {
    const project = await Project.findOne({ _id: projectId, user: req.user._id });
    if (!project) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    const query = { project: projectId };
    if (status) {
      query.status = status;
    }

    const tasks = await Task.find(query);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.updateTask = async (req, res) => {
  const projectId = req.params.projectId;
  const taskId = req.params.taskId;
  const { title, description, status, dueDate } = req.body;

  try {
    const project = await Project.findOne({ _id: projectId, user: req.user._id });
    if (!project) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    const task = await Task.findOneAndUpdate(
      { _id: taskId, project: projectId },
      { title, description, status, dueDate },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.deleteTask = async (req, res) => {
  const projectId = req.params.projectId;
  const taskId = req.params.taskId;

  try {
    const project = await Project.findOne({ _id: projectId, user: req.user._id });
    if (!project) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    const task = await Task.findOneAndDelete({ _id: taskId, project: projectId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
