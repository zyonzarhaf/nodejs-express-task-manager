import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    project: {
        type: String,
        trim: true,
        lowercase: true,
        min: 3,
        max: 72,
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
    status : {
        type: String,
        trim: true,
        lowercase: true,
        enum: [
            'none',
            'started',
            'finished'
        ],
        default: 'none'
    },
    age: {
        type: Date,
        required: true
    },
    started: {
        type: Date
    },
    finished: {
        type: Date
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
    });

taskSchema.methods.toISOString = function(date) {
    if (!date) return;

    return new Date(date.getTime()).toISOString().split("T")[0];
}

taskSchema.methods.toLocaleDateString = function(date) {
    if (!date) return;

    return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000).toLocaleDateString();
}

taskSchema.methods.getElapsedTime = function(date) {
    const created = date.getTime();
    const now = new Date().getTime();
    const result = now - created;

    const days = Math.floor(result / (1000 * 60 * 60 * 24));
    const hours = Math.floor((result % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((result % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((result % (1000 * 60)) / 1000);

    switch (true) {
        case days === 0 && hours === 0 && minutes === 0:
            return `${seconds} seconds`;
        case days === 0 && hours === 0:
            return `${minutes} minutes`;
        case days === 0:
            return `${hours} hours`;
        default:
            return `${days} days`;
    }
};

const Task = mongoose.model('Task', taskSchema);

export default Task;
