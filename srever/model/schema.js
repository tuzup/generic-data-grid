var mongoose = require('mongoose');
var logger = require('../helper/logger');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI
    ).then(() => {
        logger.info('Connected to DB');
        console.log('Connected to DB');
    }).catch((err) => {
        logger.error('Error in connecting to DB : ' + process.env.MONGODB_URI + err.stack);
        console.log(err);
    });

const Table = new mongoose.Schema({
    Brand: String,
    Model: String,
    AccelSec: Number,
    TopSpeed_KmH: Number,
    Range_Km: Number,
    Efficiency_WhKm: Number,
    FastCharge_KmH: Number,
    RapidCharge: Boolean,
    PowerTrain: String,
    PlugType: String,
    BodyStyle: String,
    Segment: String,
    Seats: Number,
    PriceEuro: Number,
    Date: Date
});

module.exports = mongoose.model('Table', Table);

