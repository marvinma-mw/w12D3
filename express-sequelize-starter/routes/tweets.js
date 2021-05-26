const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
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

const userValidators = [
    check("message")
        .exists({checkFalsy:true})
        .withMessage("PLEASE PROVIDE A MESSAGE")
        .isLength({ max:280 })
];


router.post("/",asyncHandler(async(req,res)=>{
    const validatorError = validationResult(req)
}))












module.exports = router;
