import asyncWrapper from '../middleware/custom/async.js';
import Task from '../models/task.js';
import NotFoundError from '../errors/NotFoundError.js';

const createTask = asyncWrapper(async (req, res, next) => {
    const userId = req.params.userId;
    const task = await Task.create(
        {
            ...req.body,
            user: userId 
        }
    );


    req.flash('success', 'Task successfully created');
    res.locals.redirect = `/user/${userId}/tasks`;
    next();
});

const updateTask = asyncWrapper(async (req, res, next) => {
    const { userId, taskId } = req.params;
    const task = req.body;


    try {
        await Task.findByIdAndUpdate(taskId, task);
    } catch (error) {
        throw new NotFoundError('Task not found.');
    }

    req.flash('success', 'Task successfully updated');
    res.locals.redirect = `/user/${userId}/tasks`;
    next();
});

const deleteTask = asyncWrapper(async (req, res, next) => {
    const { userId, taskId } = req.params;

    try {
        await Task.findByIdAndDelete(taskId);
    } catch (error) {
        throw new NotFoundError('Task not found.');
    }

    req.flash('success', 'Task successfully deleted');
    res.locals.redirect = `/user/${userId}/tasks`;
    next();
});

const deleteAllTasks = asyncWrapper(async (req, res, next) => {
    const userId = req.params.userId;
    const deleted = await Task.deleteMany({ user: userId });

    if (!deleted.deletedCount > 0) {
        req.flash('error', 'No task to delete');
        res.locals.redirect = `/user/${userId}/tasks`;
        return next();
    }

    req.flash('success', 'Successfully deleted all tasks');
    res.locals.redirect = `/user/${userId}/tasks`;
    next();
});

const renderTasks = asyncWrapper(async (req, res, next) => {
    const userId = req.params.userId;
    const tasks = await Task.find({ user: userId });

    res.render('task/tasks', {
        title: 'Tasks Overview',
        tasks,
    });
});

const renderTask = asyncWrapper(async (req, res) => {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);

    if (!task) {
        throw new NotFoundError('Task not found.');
    }

    res.render('task/show', {
        title: 'Task overview',
        task
    });
});

const renderNewForm = (req, res) => {
    res.render('task/new', {
        title: 'Create new task',
    });
}

const renderEditForm = asyncWrapper(async (req, res) => {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);

    if (!task) {
        throw new NotFoundError('Task not found.');
    }

    res.render('task/edit', {
        title: 'Edit task',
        task
    });
});


export {
    createTask,
    updateTask,
    deleteTask,
    deleteAllTasks,
    renderTasks,
    renderTask,
    renderNewForm,
    renderEditForm
};

