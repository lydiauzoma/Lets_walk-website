// routes/login.js
const express = require("express");
const router = express.Router();

router.get('/login', function (req, res) {
    console.log("Login route accessed!");
    res.render('login');
});

module.exports = router;
