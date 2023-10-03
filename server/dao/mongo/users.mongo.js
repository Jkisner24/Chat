import userModel from '../models/users.js';

async function userExists(userName) {
    const existingUser = await userModel.findOne({ userName });
    return existingUser !== null;
}

async function registerUser(userName) {
    const newUser = new userModel({ userName });
    await newUser.save();
}

export { userExists, registerUser };
