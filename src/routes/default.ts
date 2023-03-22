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
        const data = JSON.parse(filedata);
        res.status(200).json(data);  // TODO: Do I have to parse it and then json it again?
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
    reading.dt = new Date().toString();
    data.readings[data.readings.length] = reading;
    while (data.readings.length > 1200) {
        data.readings.shift();
    }
    let dmi = 100;
    let dma = -100;
    for (var i = 0; i < data.readings.length; i++) {
        dmi = Math.min(dmi, data.readings[i].t);
        dma = Math.max(dma, data.readings[i].t);
    }
    data.tmn = dmi;
    data.tmx = dma;
    console.log(data.tmn + " / " + reading.t + " / " + data.tmx);
    fs.writeFileSync('readings.json', JSON.stringify(data));
    res.status(201).json({
        message: 'Handling POST requests to /'
    });
});

export default router;
