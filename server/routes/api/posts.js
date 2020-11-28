const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

const common =require('./commonMethod');

//Get Posts
router.get('/' ,async (req,res)=>{
    const posts = await common.getCollection('posts');
    res.send(await posts.find({}).toArray());
})

//Add Posts

router.post('/' , async (req,res)=>{
    const posts = await common.getCollection('posts');
    await posts.insertOne({
        text : req.body.text,
        createAt : new Date()
    })
    //this is like the 200 but show that somethings has been added too.
    res.status(201).send();
})

//Delete Posts

router.delete('/:id' ,async (req, res)=>{
    const posts = await common.getCollection('posts');
    await posts.deleteOne({_id : new mongodb.ObjectID(req.params.id)});
})

module.exports = router;



