import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, REFRESH_JWT_SECRET } from '../constants/constants.js';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
userSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, JWT_SECRET, { expiresIn: '1h' });
};
userSchema.methods.createRefreshJWT = function () {
    return jwt.sign({ userId: this._id }, REFRESH_JWT_SECRET, { expiresIn: '7d' });
};
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};
const UserModel = mongoose.model("User", userSchema);
export default UserModel;
