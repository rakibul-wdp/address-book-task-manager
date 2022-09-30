const express = require('express');
const { errorMiddleware } = require('./middleware/errors');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

// For scaling in production
const cluster = require('cluster');
const os = require('os');

const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const app = express();
  app.use(express.json());
  app.use(cors({ origin: true }));
  app.use(express.urlencoded({ extended: false }));

  // Connection to DataBase
  mongoose.connect(process.env.DB_URI)
    .then(() => {
      app.listen(process.env.PORT);
      console.log(`Connected to PORT: ${process.env.PORT}`);
    })
    .catch((err) => {
      console.log(err);
    });

  // Global Error Handling
  app.use(errorMiddleware);

  // Routes
  app.use('/api/', taskRoutes, errorMiddleware);
  app.use('/', (req, res) => {
    res.send('Task Manager Internship Task of Scizers Technologies.\n \t By: Md. Rakibul Islam \n GITHUB_REPO: https://github.com/rakibul-wdp/address-book-task-manager/tree/main/task-manager-backend');
  });
  console.log(`Worker ${process.pid} started`);
}