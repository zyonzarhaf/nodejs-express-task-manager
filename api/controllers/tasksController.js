import mongoose from 'mongoose';
import asyncWrapper from '../../middleware/custom/async.js';
import httpStatusCodes from 'http-status-codes';
import NotFoundError from '../../errors/NotFoundError.js';
import BadRequestError from '../../errors/BadRequestError.js';
import Task from '../../models/task.js';

const getTasks = asyncWrapper(async (req, res) => {
    const { user } = req;
    const tasks = await Task.find({ user: user._id }).exec();

    res.status(httpStatusCodes.OK).json({ tasks });
});

const getTask = asyncWrapper(async (req, res) => {
    const { taskId } = req.params;

    if (!mongoose.isValidObjectId(taskId)) {
        throw new BadRequestError(`Invalid task id: ${taskId}`);
    }

    const { user } = req;
    const task = await Task.findOne({ _id: taskId, user: user._id }).exec();

    if (!task) throw new NotFoundError(`No task with id ${taskId} was found.`);

    res.status(httpStatusCodes.OK).json({ task });
});

const createTask = asyncWrapper(async (req, res) => {
    const { user } = req;
    const data = req.body;
    const task = await Task.create({ ...data, user: user._id });

    res.status(httpStatusCodes.OK).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
    const { taskId } = req.params;

    if (!mongoose.isValidObjectId(taskId)) {
        throw new BadRequestError(`Invalid task id: ${taskId}`);
    }

    const { user } = req;
    const data = req.body;
    const task = await Task.findOneAndUpdate(
        { _id: taskId, user: user._id }, data
    );

    if (!task) throw new NotFoundError(`No task with id ${taskId} was found.`);

    res.status(httpStatusCodes.OK).json({ task });
});

export {
    getTasks,
    getTask,
    createTask,
    updateTask
};
