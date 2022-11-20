import express from 'express';
const router = express.Router();
import fs from 'fs';
import cors from 'cors';

// here are commands to change the data

router.options('/reset', cors()) // enable pre-flight request
router.post('/reset', cors(), (req, res, next) => {
    console.log("post reset");
    let data: dataType;
    try {
        const filedata = fs.readFileSync('readings.json', "utf8");
        data = JSON.parse(filedata);
    } catch (err) {
        data.readings = [];
    }
    const t = data.readings[data.readings.length - 1].t;
    const h = data.readings[data.readings.length - 1].h;
    data.tmn = t;
    data.tmx = t;
    data.hmn = h;
    data.hmx = h;

    fs.writeFileSync('readings.json', JSON.stringify(data));
    //    console.log('data saved ', data.readings);

    res.status(201).json({
        message: 'Handling POST requests to /cmd/reset'
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
        message: 'Handling POST requests to /cmd/clear'
    });
});

export default router;
