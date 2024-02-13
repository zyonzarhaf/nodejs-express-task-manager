import asyncWrapper from '../middleware/custom/async.js';
import User from '../models/user.js';
import Task from '../models/task.js';
import Project from '../models/project.js';
import NotFoundError from '../errors/NotFoundError.js';

const createTask = asyncWrapper(async (req, res, next) => {
    const userId = req.params.userId;
    const task = await Task.create(
        {
            ...req.body,
            age: new Date(),
            user: userId 
        }
    );
    const operations = [];

    if (task.project) {
        operations.push(Project.findOneAndUpdate(
            { name: task.project },
            { $push: { tasks: task } },
            { upsert: true }
        ));
    }

    operations.push(User.findByIdAndUpdate(
        userId,
        { $push: { tasks: task } }
    ));

    await Promise.all(operations);

    req.flash('success', 'Task successfully created');
    res.locals.redirect = `/user/${userId}/tasks`;
    next();
});

const updateTask = asyncWrapper(async (req, res, next) => {
    const { userId, taskId } = req.params;
    const task = req.body;
    const statusActions = {
        'started': () => {
            task.started = new Date();
        },
        'finished': () => {
            task.finished = new Date();
        },
        'none': () => { 
            task.started = null;
            task.finished = null;
        }
    };

    if (statusActions[task.status]) {
        statusActions[task.status]();
    }

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
    const query = req.query;
    const tasks = await Task.find({ user: userId });
    const filters = {
        priority: Task.schema.path('priority').enumValues,
        status: Task.schema.path('status').enumValues,
        project: [
            ...new Set(
                tasks
                    .map(task => task.project)
                    .filter(project => project && project)
            )
        ],
    }

    if (Object.keys(query).length > 0) {
        const tasks = await Task.find({ user: userId, ...query });

        if (tasks.length < 1) {
            req.flash('error', 'No task matches filter conditions');
            res.locals.redirect = `/user/${userId}/tasks`;
            return next();
        }

        return res.render('task/tasks', {
            title: 'Tasks Overview',
            tasks,
            filters,
            query
        });
    }

    res.render('task/tasks', {
        title: 'Tasks Overview',
        tasks,
        filters,
        query
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

