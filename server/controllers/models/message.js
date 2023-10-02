const mongoose = require('mongoose')

const collection = 'Message'

const messageSchema = new mongoose.Schema({

    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },       
})

const messageModel = mongoose.model(collection, messageSchema)

module.exports = {
    messageModel
}