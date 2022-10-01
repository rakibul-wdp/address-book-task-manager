const { ErrorHandler } = require('./middleware/errors');
const { successHandler } = require('./middleware/success');
const User = require('./models/user');
const Task = require('./models/task');

const user = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = { name };

    const addUser = await User.create(user);

    if (addUser)
      return res.status(201).json(successHandler(`User ${name} added successfully!`));

    return next(new ErrorHandler());

  } catch (err) {
    return next(err);
  }
}

const createTask = async (req, res, next) => {
  try {
    const { name, dueDate, status } = req.body;

    const task = { name, dueDate, status };

    const addTask = await Task.create(task);

    if (addTask)
      return res.status(201).json(successHandler(`Task: ${name} created successfully!`));

    return next(new ErrorHandler());

  } catch (err) {
    return next(err);
  }
}

const getAllTasks = async (req, res, next) => {
  try {
    const { name, status, dueDate } = req.query;
    const filters = {};

    if (name)
      filters.name = new RegExp(name, 'i');

    if (status)
      filters.status = status;

    if (dueDate)
      filters.dueDate = dueDate;


    const getTasks = await Task.find(filters);

    if (getTasks)
      return res.status(200).json(successHandler(getTasks));

    return next(new ErrorHandler());

  } catch (err) {
    return next(err);
  }
}

const editTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id)
      return next(new ErrorHandler(400, "Id is required as parameter"));

    const task = await Task.findById(id);

    if (!task) {
      return next(new ErrorHandler(404, "Task not found by id!"));
    }

    const { name, status, dueDate } = req.body;

    if (!(name || dueDate))
      return next(new ErrorHandler(400, "Atleast one field (name or dueDate) is required"));

    task.name = name || task.name;
    task.dueDate = dueDate || task.dueDate;

    await task.save();

    return res.status(200).json(successHandler('Task Updated successfully'));

  } catch (err) {
    return next(err);
  }
}

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteT = await Task.deleteOne({ _id: id });

    if (deleteT.deletedCount != 0)
      return res.status(200).json(successHandler(`Task deleted successfully!`));

    return next(new ErrorHandler(404, "Task not found by id!"));

  } catch (err) {
    return next(err);
  }
}

const changeTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (task) {

      const newstat = (task.status == 'PENDING') ? 'COMPLETED' : 'PENDING';

      const updated = await Task.updateOne({ _id: id }, {
        status: newstat
      });

      return res.status(200).json(successHandler(`Task status changed to ${newstat}`));
    }

    return next(new ErrorHandler(404, "Task not found by id!"));

  } catch (err) {
    return next(err);
  }
}

module.exports = {
  user,
  createTask,
  getAllTasks,
  editTask,
  deleteTask,
  changeTaskStatus
}