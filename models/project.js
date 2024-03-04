import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        min: 3,
        max: 72
    },
    tasks: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
});

projectSchema.post('findOneAndUpdate', async function () {
    const update = this.getUpdate();

    if (!update['$pull']) return;

    await this.model.findOneAndDelete({ ...this.getQuery(), tasks: [] }).exec();
});

projectSchema.post('updateMany', async function () {
    const update = this.getUpdate();

    if (!update['$pull'].tasks) return;

    console.log(update['$pull'].tasks);

    await this.model.deleteMany({ ...this.getQuery(), tasks: [] }).exec();
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
