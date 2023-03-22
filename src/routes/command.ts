import express from 'express';
const router = express.Router();
import fs from 'fs';
import cors from 'cors';

// here are commands to change the data

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
