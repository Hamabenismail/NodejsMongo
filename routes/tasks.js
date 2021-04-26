const Task = require('../models/Task');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { route } = require('./posts');

router.post('/add', async (req,res) => {
    const task = new Task({
        title : req.body.title,
        date : Date.now()
    });
   
    try {
        const savedTask = await task.save();
        res.status(200).json({body : savedTask});
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/', async (req,res) => {
    try{
        
        const tasks = await Task.find();
        res.status(200).json({body:tasks});

    } catch(err) {
        res.status(400).send(err);
    }
});
router.get('/searchBy/:searchKey', async (req,res) => {
    try {
        var regex = new RegExp(["^", 'y', "$"].join(""), "i");
   const task = await Task.findOne({title: /^ghkk$/i });
   res.status(200).json({body : task});
    } catch(err) {
        res.status(400).send({message:err});
    }
})

router.delete('/delete/:id', async (req,res) => {
    const tasks = await Task.remove({_id:req.params.id});
    try {
        res.status(200).json({body : tasks});
    }catch(err) {
        res.status(400).send({message : err});
    }
})

module.exports = router;