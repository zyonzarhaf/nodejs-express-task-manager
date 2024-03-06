import httpStatusCodes from 'http-status-codes';
import User from '../../models/user.js';

const getUser = (req, res) => {
    const { user } = req;

    res.status(httpStatusCodes.OK).json({ user });
}

const createUser = async (req, res) => {
    const data = req.body;
    const user = await User.create(data);

    res.status(httpStatusCodes.OK).json({ user });
}

export { getUser, createUser };
