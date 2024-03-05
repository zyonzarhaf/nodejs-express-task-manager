import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import randToken from 'rand-token';
import { toISOStringCustom, toLocaleDateStringCustom } from '../helpers/helpers.js';
import Task from './task.js';

const userSchema = mongoose.Schema(
    {
        first_name: {
            type: String,
            trim: true,
            lowercase: true,
            required: true
        },
        last_name: {
            type: String,
            trim: true,
            lowercase: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        tasks: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
            }
        ],
        apiToken: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

userSchema.methods.toISOStringCustom = toISOStringCustom();
userSchema.methods.toLocaleDateStringCustom = toLocaleDateStringCustom();

userSchema.pre('validate', function () {
    this.apiToken = randToken.generate(16);
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10)
});

userSchema.pre('findOneAndUpdate', async function () {
    const document = await this.model.findOne(this.getQuery()).exec();

    if (!document) return;

    const update = this.getUpdate();

    if (update.password) {
        const { password: oldPassword } = document;
        const { password: newPassword } = update;

        if (newPassword !== oldPassword) {
            update.password = await bcrypt.hash(newPassword, 10);
        }
    }
});

userSchema.pre('findOneAndDelete', async function () {
    const document = await this.model.findOne(this.getFilter()).exec();
    await Task.deleteMany({ user: document._id }); 
});

userSchema.methods.comparePasswords = async function (password) {
    const result = await bcrypt.compare(password, this.password);
    return result;
}

userSchema.virtual('fullName').get(function () {
    return `${this.first_name} ${this.last_name}`
});

const User = mongoose.model('User', userSchema);

export default User;
