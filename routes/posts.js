const express = require('express');
const Post = require('../models/Post');

const router = express.Router();


router.get('/', async (req,res) => {
    console.log('heyy');
    const posts = await Post.find();
    // find by title or any attribute
    // const posts = await Post.find({title : 'the title you want'});
    try {
        res.status(200).json({body : posts});
    }catch(err) {
        res.status(400).json({message: err});
    }
})
router.get('/byId/:id',async (req,res) => {
    const post = await Post.findById(req.params.id);
    try {
        res.status(200).json(post)
    } catch(err) {
        res.status(400).json({message : err});
    }
    
})
router.delete('/delete/:id',async(req,res) => {
    const removedPost = await Post.remove({_id:req.params.id});
    try {
        res.status(200).send(removedPost);
    }catch(err) {
        res.status(400).send({message : err});
    }
});

router.patch('/update/:id',async (req,res) => {
    try {
    const updatedPost = await Post.updateOne({_id:req.params.id},{
        $set : {
            title : req.body.title
        }
    });
    res.status(200).send(updatedPost);
    } catch(err) {
        res.status(400).json({message:err});
    }
})

router.post('/add', async (req,res) => {
    if(!req.body.title  || !req.body.description) {
        res.status(400).json({message : 'title is missing'});
        return;
    }
    const post = new Post({
        title : req.body.title,
        description : req.body.description
    });
    const savedPost = await post.save()
    try {
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;