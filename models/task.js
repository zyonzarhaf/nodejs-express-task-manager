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

taskSchema.post('save', async function () {
    await Promise.all(
        [
            await User.findOneAndUpdate(
                { _id: this.user },
                { $addToSet: { tasks: this._id } }
            ).exec(),

            await Project.findOneAndUpdate(
                { name: this.project },
                { $addToSet: { tasks: this._id }},
                { upsert: true, new: true }
            ).exec()
        ]
    );
});

taskSchema.pre('findOneAndUpdate', function () {
    const update = this.getUpdate();
    
    if (!update.due) update['$unset'] = { due: 1 };
});

taskSchema.pre('findOneAndDelete', async function () {
    const document = await this.model.findOne(this.getFilter()).exec();

    await Promise.all(
        [
            User.findOneAndUpdate(
                { _id: document.user },
                { $pull: { tasks: document._id } }
            ).exec(),

            Project.findOneAndUpdate(
                { name: document.project },
                { $pull: { tasks: document._id } }
            ).exec()
        ]
    );
});

taskSchema.pre('deleteMany', async function () {
    const documents = await this.model.find(this.getQuery())
                                      .select('id project user')
                                      .exec();

    const { ids, projects, user } = {
        user: documents[0]?.user,
        ids: documents.map(doc => doc.id),
        projects: [...new Set(documents.map(doc => doc.project))]
    };

    await Promise.all([
        User.findOneAndUpdate(
            { _id: user },
            { tasks: [] }
        ).exec(),

        Project.updateMany(
            { name: { $in: projects } },
            { $pull: { tasks: { $in: ids } } }
        ).exec()
    ]);
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
