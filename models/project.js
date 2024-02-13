import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        min: 3,
        max: 72
    },
    tasks: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    progress: {
        type: Number
    }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
