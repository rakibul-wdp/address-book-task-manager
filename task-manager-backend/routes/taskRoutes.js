const express = require('express');
const router = express.Router();
const taskController = require('./taskController');

router.get('/task', taskController.getAllTasks);

router.post('/user', taskController.user);
router.post('/task', taskController.createTask);

router.put('/task/:id', taskController.editTask);

router.patch('/task/:id', taskController.changeTaskStatus);

router.delete('/task/:id', taskController.deleteTask);

module.exports = router;