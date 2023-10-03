import mongoose from "mongoose"

const collection = 'User'

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
})

const userModel = mongoose.model(collection, userSchema)

export default userModel
