// routes/register.js
const express = require("express");
const router = express.Router();

router.get('/users', function (req, res) {
    console.log("users route accessed!");
    res.render('users');
});

module.exports = router;
