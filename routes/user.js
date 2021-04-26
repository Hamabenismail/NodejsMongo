const User = require('../models/User');
const express = require('express');
const Post = require('../models/Post');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/add',async(req,res) => {
    const user = new User({
        name : req.body.name,
        email : req.body.email,

    });
    const savedUser = await user.save();
    try {
        res.status(200).send(savedUser);
    }catch(err) {
        res.status(400).send(err);
    }
});

router.get('/get', async (req,res) => {
    try {
        const users = await User.aggregate([{
            $lookup: {
                from : 'posts',
                localField : 'postsList',
                foreignField: '_id',
                as:"posts"
            }
        }]);

        res.status(200).send(users);
    } catch (err) {
        res.status(400).json({message:err});
    }
})

router.patch('/addPostsToUser/:id', async (req,res) => {

    try {
        const postsIds = req.body.posts ;
        let ids = postsIds.map(element => {
            const id = mongoose.Types.ObjectId(element);
            Post.findById(id);
            return id;
           
        });
        const oldUser = await User.findById(req.params.id);
        let arr = [...ids,...oldUser.postsList];
        console.log(arr);
        const updatedUser = await User.updateOne({_id:req.params.id},{
            $set : {
                postsList : arr
            }
        });
        res.status(200).send(updatedUser);
        } catch(err) {
            res.status(400).json({message:err});
        }
} )


module.exports = router;