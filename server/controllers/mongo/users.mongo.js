const mongoose = require('mongoose')

const collection = 'User'

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
/*     email: {
        type: String,
        required: tue, 
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }
 */
})

const userModel = mongoose.model(collection, userSchema)

module.exports = {
    userModel
}