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

const TableSchema = new mongoose.Schema({
    Brand:{ type : String
    },
    Model: String,
    AccelSec: String,
    TopSpeed_KmH: String,
    Range_Km: String,
    Efficiency_WhKm: String,
    FastCharge_KmH: String,
    RapidCharge: String,
    PowerTrain: String,
    PlugType: String,
    BodyStyle: String,
    Segment: String,
    Seats: String,
    PriceEuro: String,
    Date: String,
});


module.exports = mongoose.model('Table', TableSchema);


