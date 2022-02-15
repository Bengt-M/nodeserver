const express = require('express');
const router = express.Router();
const fs = require('fs');
const cors = require('cors');

// here are commands to change the data

router.options('/reset', cors()) // enable pre-flight request
router.post('/reset', cors(), (req, res, next) => {
    console.log("post reset");
    let data = {};
    try {
        const filedata = fs.readFileSync('readings.json', "utf8");
        data = JSON.parse(filedata);
    } catch (err) {
        data.readings = [];
    }
    data.tmn = 1000;
    data.tmx = -1000;
    data.hmn = 1000;
    data.hmx = -1000;

    fs.writeFileSync('readings.json', JSON.stringify(data));
    console.log('data saved ', data.readings.length);

    res.status(201).json({
        message: 'Handling POST requests to /cmd'
    });
});


router.options('/clear', cors()) // enable pre-flight request
router.post('/clear', cors(), (req, res, next) => {
    console.log("post clear");
    try {
        fs.rmSync('readings.json');
        console.log('data cleared ');
    } catch (err) {
        console.log(err);
    }

    res.status(201).json({
        message: 'Handling POST requests to /cmd'
    });
});

module.exports = router;
