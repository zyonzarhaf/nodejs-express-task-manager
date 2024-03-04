import mongoose from 'mongoose';

import {
    toISOStringCustom,
    toLocaleDateStringCustom,
    getElapsedTime
} from '../helpers/helpers.js';

import User from './user.js';
import Project from './project.js';

const taskSchema = mongoose.Schema(
    {
        project: {
            type: String,
            trim: true,
            lowercase: true,
            min: 3,
            max: 72
        },
        priority: {
            type: String,
            trim: true,
            lowercase: true,
            enum: [
                'low',
                'medium',
                'high'
            ],
            default: 'low'
        },
        age: {
            type: Date,
            required: true
        },
        due: {
            type: Date
        },
        description: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }, 
    {
        timestamps: true, 
    }
);

taskSchema.methods.toISOStringCustom = toISOStringCustom(); 
taskSchema.methods.toLocaleDateStringCustom = toLocaleDateStringCustom();
taskSchema.methods.getElapsedTime = getElapsedTime()

taskSchema.pre('validate', function() {
    this.age = new Date();
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
