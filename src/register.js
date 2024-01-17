// routes/register.js
const express = require("express");
const router = express.Router();

router.get('/register', function (req, res) {
    console.log("Register route accessed!");
    res.render('register');
});

module.exports = router;
