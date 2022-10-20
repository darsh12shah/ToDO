const mongoose = require('mongoose')
// const Cryptr = require('cryptr');
// const cryptr = new Cryptr('myTotalySecretKey');
var CryptoJS = require("crypto-js");
 
const taskSchema = new mongoose.Schema(
    //{
//const Task = mongoose.model('Task', 
{
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
})
 
 
//Hash the Task Text before saving
taskSchema.pre('save', async function (next) {
    const task = this
 
    if (task.isModified('description')) {
        
        task.description= await CryptoJS.AES.encrypt(task.description, 'secret key 123').toString();
    }
 
    next()
})
// taskSchema.pre('send', async function (next) {

const Task = mongoose.model('Task', taskSchema)
 
module.exports = Task
