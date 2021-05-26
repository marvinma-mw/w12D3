const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require("../db/models");
const { Tweet } = db;
const router = express.Router();



router.get("/", asyncHandler(async (req, res) => {
    const tweets = await Tweet.findAll();
    res.json({ tweets });
  }));
















module.exports = router;
