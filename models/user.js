import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { toISOStringCustom, toLocaleDateStringCustom } from '../helpers/helpers.js';

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
    },
    {
        timestamps: true,
    }
);

userSchema.methods.toISOStringCustom = toISOStringCustom();
userSchema.methods.toLocaleDateStringCustom = toLocaleDateStringCustom();

userSchema.pre('save', async function(next) {
    const user = this;
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
});

userSchema.pre('findOneAndUpdate', async function(next) {
    const update = this.getUpdate();
    if (update.password) {
        const hashedPassword = await bcrypt.hash(update.password, 10);
        update.password = hashedPassword;
    }
    next();
});

userSchema.methods.comparePasswords = function(inputpassword) {
    return bcrypt.compare(inputpassword, this.password);
}




}

userSchema.virtual('fullName').get(function () {
    return `${this.first_name} ${this.last_name}`
});

const User = mongoose.model('User', userSchema);

export default User;
