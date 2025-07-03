const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected ');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await User.deleteMany();
    await Project.deleteMany();
    await Task.deleteMany();

    const hashedPassword = await bcrypt.hash('Test@123', 10);

    const user = await User.create({
      email: 'test@example.com',
      password: hashedPassword,
    });

    console.log(' User Created:', user.email);

    const projects = await Project.insertMany([
      { user: user._id, title: 'Project 1', description: 'First test project', status: 'active' },
      { user: user._id, title: 'Project 2', description: 'Second test project', status: 'completed' },
    ]);

    console.log(' Projects Created:', projects.map(p => p.title));

    const tasksData = [];

    projects.forEach((project) => {
      tasksData.push(
        { project: project._id, title: 'Task 1', description: 'Task 1 desc', status: 'todo' },
        { project: project._id, title: 'Task 2', description: 'Task 2 desc', status: 'in-progress' },
        { project: project._id, title: 'Task 3', description: 'Task 3 desc', status: 'done' },
      );
    });

    await Task.insertMany(tasksData);

    console.log(' Tasks Created');

    console.log(' Seeding Complete ');
    process.exit();
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

const start = async () => {
  await connectDB();
  await seedData();
};

start();
