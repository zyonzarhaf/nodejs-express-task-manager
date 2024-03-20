import 'dotenv/config';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../main.js';

import { 
    connectDB,
    disconnectDB,
    dropCollections
} from './setuptestdb.js';

import User from '../../models/user.js';
import Task from '../../models/task.js';
import Project from '../../models/project.js';

beforeAll(async () => { await connectDB(); });
beforeEach(async () => { await dropCollections(); });
afterAll(async () => { await disconnectDB(); });

const mockUser = () => ({ 
    first_name: 'john',
    last_name: 'async awaiter',
    email: 'john@gmail.com',
    password: '12345678'
});

const mockTask = (userId) => ({
    project: 'node.js',
    description: 'once upon a time in node.js land',
    user: userId
});

describe("User API", () => {
    describe("GET /api/user/account", () => {
        test('should return user account information', async () => {
            const { apiToken } = await User.create(mockUser());
            const res = await request(app)
                              .get('/api/user/account')
                              .set('Authorization', apiToken);

            expect(res.status).toEqual(200);
        });
    });

    describe("POST /api/user/register", () => {
        test("should create a new user in the database", async () => {
            const user = mockUser();
            const res = await request(app)
                              .post('/api/user/register')
                              .send(user)
                              .set('Content-type', 'application/json');

            expect(res.status).toEqual(200);
        });
    });

    describe("GET /api/user/tasks", () => {
        test("should return all tasks created by the user", async () => {
            const { _id, apiToken } = await User.create(mockUser());
            await Task.create(mockTask(_id));
            const res = await request(app)
                              .get('/api/user/tasks')
                              .set('Authorization', apiToken);

            expect(res.status).toEqual(200);
        });
    });

    describe("GET /api/user/tasks/:taskId", () => {
        test("should return the specified task created by the user", async () => {
            const { _id: userId, apiToken } = await User.create(mockUser());
            const { _id: taskId } = await Task.create(mockTask(userId));
            const res = await request(app)
                              .get(`/api/user/tasks/${taskId}`)
                              .set('Authorization', apiToken);

            expect(res.status).toEqual(200);
        });
    });

    describe("PUT /api/user/tasks/:taskId", () => {
        test("should update a task previously created by the user", async () => {
            const { _id: userId, apiToken } = await User.create(mockUser());
            const { _id: taskId } = await Task.create(mockTask(userId));

            const update = { 
                project: "jest",
                description: 'once upon a time in jest land' 
            }

            const res = await request(app)
                              .put(`/api/user/tasks/${taskId}`)
                              .send(update)
                              .set('Authorization', apiToken);

            expect(res.status).toEqual(200);
        });
    });
});

