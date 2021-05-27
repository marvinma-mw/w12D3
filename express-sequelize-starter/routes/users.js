const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs')
const { handleValidationErrors } = require('../utils.js');
const { check } = require('express-validator');
const db = require("../db/models");
const { getUserToken } = require('../auth.js')
const router = express.Router();
const { User } = db;


const validateUsername = [
    check('username')
        .exists({ checkFalsy: true})
        .withMessage("Please Provide A Username")
];

const validateEmailAndPassword = [
    check("email")
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage("Please provide a valid email."),
    check("password")
      .exists({ checkFalsy: true })
      .withMessage("Please provide a password."),
  ];


router.post(
    '/',
    validateUsername,
    validateEmailAndPassword,
    handleValidationErrors,
    asyncHandler(async (req,res) => {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            username,
            email,
            hashedPassword
        })
        const token = getUserToken(user);
        res.status(201).json({
            user: { id: user.id},
            token,
        })
}))







module.exports = router;
