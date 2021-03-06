const express = require('express');
const asyncHandler = require('express-async-handler');
const { handleValidationErrors } = require('../utils.js');
const { check } = require('express-validator');
const db = require("../db/models");
const { Tweet } = db;
const router = express.Router();

const tweetNotFoundError = (tweetId)=>{
    const error = Error(`Tweet At ID ${tweetId} Not Found`);
    error.title = "Tweet Not Found";
    error.status = 404;
    return error
}

router.get("/", asyncHandler(async (req, res) => {
    const tweets = await Tweet.findAll();
    res.json({ tweets });
}));

router.get("/:id(\\d+)", asyncHandler(async (req, res, next) => {
    const tweetId = req.params.id;
    console.log(tweetId);
    const tweet = await Tweet.findByPk(parseInt(tweetId, 10));

    if (tweet) {
         res.json({ tweet });
    } else {
         next(tweetNotFoundError(tweetId))
    }
}));

const tweetValidators = [
    check("message")
        .exists({checkFalsy:true})
        .withMessage("PLEASE PROVIDE A MESSAGE")
        .isLength({ max:280 })
        .withMessage("Tweet CANNOT EXCEED 280 CHARACTERS")
];


router.post(
    "/",
    tweetValidators,
    handleValidationErrors,
    asyncHandler(async(req,res)=>{
        const { message } = req.body;
        const newTweet = await Tweet.create({ message });
        res.json({ newTweet })
}));

router.put("/:id(\\d+)", tweetValidators, handleValidationErrors, asyncHandler(async(req, res)=>{
    const tweetId = parseInt(req.params.id,10);
    const tweet = await Tweet.findByPk(tweetId);

    if(tweet){
        console.log(tweet)
        await tweet.update({message:req.body.message}) //fixed
        res.json({tweet})
    }else{
        next(tweetNotFoundError(tweetId))
    }
}))

router.delete('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const tweetId = parseInt(req.params.id);
    const tweet = await Tweet.findByPk(tweetId);

    if (tweet) {
        await tweet.destroy();
        res.status(204).end();
    } else {
        next(tweetNotFoundError(tweetId));
    }
}));









module.exports = router;
