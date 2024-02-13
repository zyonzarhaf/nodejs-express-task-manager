import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        last: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
}, {
        timestamps: true,
    });

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

userSchema.methods.toISOString = function(date) {
    if (!date) return;

    return new Date(date.getTime()).toISOString().split("T")[0];
}

userSchema.methods.toLocaleDateString = function(date) {
    if (!date) return;

    return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000).toLocaleDateString();
}

userSchema.virtual('fullName').get(function () {
    return `${this.name.first} ${this.name.last}`
});

const User = mongoose.model('User', userSchema);

export default User;
