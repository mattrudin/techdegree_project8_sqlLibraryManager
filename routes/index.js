const express = require('express');
const router = express.Router();

/************************************************************************************
Routes
************************************************************************************/
// Start page
router.get('/', (req, res) => {
    res.render('index', {
        title: "Books"
    });
});


module.exports = router;