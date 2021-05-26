const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require("../db/models");
const { Tweet } = db;
const router = express.Router();



router.get("/", asyncHandler(async (req, res) => {
    const tweets = await Tweet.findAll();
    res.json({ tweets });
  }));

router.get("/:id(\\d+)", asyncHandler(async (req, res, next) => {
    const tweetId = req.params.id;
    console.log(tweetId);
    const tweet = await Tweet.findByPk(parseInt(tweetId, 10));

    if (tweet) {
        await res.json({ tweet });
    } else {
        //TODO
    }
}));














module.exports = router;
