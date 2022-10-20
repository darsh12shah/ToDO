const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
var CryptoJS = require("crypto-js");
const router = new express.Router()
// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc



router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
         if (!task) {
            return res.status(404).send()
        }
        task.description = await CryptoJS.AES.decrypt(task.description, 'secret key 123').toString(CryptoJS.enc.Utf8)

        res.status(201).send(task)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})
 


router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks =await Task.find({owner:req.user._id})
        if (!tasks) {
            return res.status(404).send()
        }
        for (var i = 0, len = tasks.length; i < len; i++) {
            let ciphertext = tasks[i].description;
            const decryptDesc = await CryptoJS.AES.decrypt(ciphertext, 'secret key 123').toString(CryptoJS.enc.Utf8)
            tasks[i].description = decryptDesc
          }
        await req.user.populate('tasks');
        
        //  res.send(req.user.tasks)
        // await req.user.populate('tasks')
        // res.send(tasks)
         res.send(req.user.tasks)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})
 
router.get('/tasks/:id', auth,async(req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({_id,owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        let ciphertext = task.description;
        task.description = await CryptoJS.AES.decrypt(ciphertext, 'secret key 123').toString(CryptoJS.enc.Utf8)
        
        res.send(task)
    } catch (e) {  
        console.log(e); 
        res.status(500).send(e)
    }
})
 
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
 
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
 
    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
 
        if (!task) {
            return res.status(404).send()
        }
        
        // task.description = await cryptr.decrypt(task.description)
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        task.description = await CryptoJS.AES.decrypt(task.description, 'secret key 123').toString(CryptoJS.enc.Utf8)
        res.send(task)
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
})
 
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
 
        if (!task) {
            res.status(404).send()
        }
 
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})
 
//My function
router.delete('/tasks', auth, async (req, res) => {
    try {
        console.log("hii");
        const task = await Task.deleteMany({owner: req.user._id})
        console.log(task)
        res.send('All Tasks Deleted')
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})
 
module.exports = router
