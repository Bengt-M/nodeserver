import express from 'express';
const router = express.Router();
import fs from 'fs';
import cors from 'cors';

// The data is POSTed by the sensor and stored in a JSON file
// A client may GET that file

router.get('/', cors(), (req, res, next) => {
    let loadedReadings = [];
    try {
        const filedata = fs.readFileSync('readings.json', "utf8");
        const data = JSON.parse(filedata);
        res.status(200).json(data);
    } catch (err) {
        console.log("get err", err);
    }
});

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
    reading.dt = new Date().toString();
    data.readings[data.readings.length] = reading;
    while (data.readings.length > 800) {
        data.readings.shift();
        console.log("shifting");
    }
    data.tmn = Math.min(reading.t, data.tmn);
    data.tmx = Math.max(reading.t, data.tmx);
    data.hmn = Math.min(reading.h, data.hmn);
    data.hmx = Math.max(reading.h, data.hmx);
    console.log(data.tmn + " / " + reading.t + " / " + data.tmx;
    fs.writeFileSync('readings.json', JSON.stringify(data));
    res.status(201).json({
        message: 'Handling POST requests to /'
    });
});

export default router;
