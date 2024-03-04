import mongoose from 'mongoose';
import asyncWrapper from '../middleware/custom/async.js';
import NotFoundError from '../errors/NotFoundError.js';
import BadRequestError from '../errors/BadRequestError.js';
import Task from '../models/task.js';

const createTask = asyncWrapper(async (req, res, next) => {
    if (req.skip) return next();

    const { userId } = req.params;
    const formData = req.body;

    await Task.create({ ...formData, user: userId });
    req.flash('success', 'Task successfully created.');
    res.locals.redirect = `/user/${userId}/tasks`;
    next();
});

const updateTask = asyncWrapper(async (req, res, next) => {
    if (req.skip) return next();

    const { userId, taskId } = req.params;

    if (!mongoose.isValidObjectId(taskId)) {
        throw new BadRequestError(`Invalid task id: ${taskId}.`);
    }

    const formData = req.body;

    const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, formData).exec();

    if (!updatedTask) {
        throw new NotFoundError(`No task with id ${taskId} was found.`);
    }

    res.locals.redirect = `/user/${userId}/tasks`;
    req.flash('success', 'Task successfully updated.');
    next();
});

const deleteTask = asyncWrapper(async (req, res, next) => {
    const { userId, taskId } = req.params;

    if (!mongoose.isValidObjectId(taskId)) {
        throw new BadRequestError(`Invalid task id: ${taskId}.`);
    }

    const deletedTask = await Task.findOneAndDelete({ _id: taskId }).exec();

    res.locals.redirect = `/user/${userId}/tasks`;

    if (!deletedTask) {
        const message = 
            `Could not delete the task: no task with id ${taskId} was found.`;

        console.log(message);
        req.flash('error', message);
        return next();
    }

    req.flash('success', 'Task successfully deleted.');
    next();
});

const deleteAllTasks = asyncWrapper(async (req, res, next) => {
    const { userId } = req.params;
    const deletedTasks = await Task.deleteMany({ user: userId }).exec();

    res.locals.redirect = `/user/${userId}/tasks`;

    if (deletedTasks.n < 1) {
        const message = `You haven't created any task to delete yet.`

        console.log(message);
        req.flash('error', message);
        return next();
    }

    req.flash('success', 'All tasks have been successfully deleted.');
    next();
});

const renderTasks = asyncWrapper(async (req, res) => {
    const { userId } = req.params;
    const tasks = await Task.find({ user: userId }).exec();

    res.render('task/tasks', {
        title: 'Tasks overview',
        tasks,
    });
});

export {
    createTask,
    updateTask,
    deleteTask,
    deleteAllTasks,
    renderTasks
};

