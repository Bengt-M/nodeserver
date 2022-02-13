const express = require('express');
const router = express.Router();
const fs = require('fs');

// The data is POSTed by the sensor and stored in a JSON file
// A client may GET that file

router.get('/', (req, res, next) => {
    console.log("get");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-store");
    res.header(
        "Access-Control-Allow-Headers"
    );
    let loadedReadings = [];
    try {
        const data = fs.readFileSync('readings.json', "utf8");
        loadedReadings = JSON.parse(data);
    } catch (err) {
        console.log(err);
    }
    const response = loadedReadings;
    res.status(200).json(response);
});

router.post('/', (req, res, next) => {
    console.log("post");
    let data = {};
    try {
        const filedata = fs.readFileSync('readings.json', "utf8");
        data = JSON.parse(filedata);
    } catch (err) {
        // If the file is not there we initialise it with some data. We should only get here the first time
        console.log(err);
        data.tmn = 1000;
        data.tmx = -1000;
        data.hmn = 1000;
        data.hmx = -1000;
        data.readings = [];
    }

    // req.body.dt = new Date().toLocaleString('sv-SE', { timeZone: 'CET' });
    req.body.dt = new Date();
    data.readings.push(req.body);
    while (data.readings.length > 800) {
        data.readings.shift();
    }
    if (req.body.t < data.tmn) {
        data.tmn = req.body.t;
    }
    if (req.body.t > data.tmx) {
        data.tmx = req.body.t;
    }
    if (req.body.h < data.hmn) {
        data.hmn = req.body.h;
    }
    if (req.body.h > data.hmx) {
        data.hmx = req.body.h;
    }
    fs.writeFileSync('readings.json', JSON.stringify(data));
    console.log('data saved ', data.readings.length);

    res.status(201).json({
        message: 'Handling POST requests to /'
    });
});

module.exports = router;
