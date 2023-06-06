import express from 'express';
const router = express.Router();
import fs from 'fs';
import cors from 'cors';

// The data is POSTed by the sensor and stored in a JSON file
// A client may GET that file

router.options('/', cors()) // enable pre-flight request
router.get('/', cors(), (req, res, next) => {
    let loadedReadings = [];
    try {
        const filedata = fs.readFileSync('readings.json', "utf8");
        res.status(200).send(filedata);
    } catch (err) {
        console.log("get err ", err);
    }
});

router.options('/', cors()) // enable pre-flight request
router.post('/', (req, res, next) => {
    let reading: readingType = req.body;
    console.log("reading", reading.t);
    let data: dataType = {
        tmn: 1000, tmx: -1000, hmn: 1000, hmx: -1000, readings: new Array<readingType>
    };
    try {
        const filedata = fs.readFileSync('readings.json', "utf8");
        data = JSON.parse(filedata);
    } catch (err) {
        console.log("post err");
    }
    reading.dt = Date.now();
    data.readings[data.readings.length] = reading;
    while (data.readings.length > 1200) {
        data.readings.shift();
    }
    for (var i = 0; i < data.readings.length; i++) {
        data.tmn = Math.min(data.tmn, data.readings[i].t);
        data.tmx = Math.max(data.tmx, data.readings[i].t);
        data.hmn = Math.min(data.hmn, data.readings[i].h);
        data.hmx = Math.max(data.hmx, data.readings[i].h);
    }
    console.log(data.tmn + " / " + reading.t + " / " + data.tmx);
    fs.writeFileSync('readings.json', JSON.stringify(data));
    res.status(201).json({
        message: 'Handling POST requests to /'
    });
});

export default router;
