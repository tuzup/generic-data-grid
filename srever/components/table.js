const model = require('../model/schema');
const logger = require('../helper/logger');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');


//This function is used to initalize the data from the csv file to the database 
exports.addData = async (req, res) => {
    const results = [];
    const csvFilePath = path.join(__dirname, '../data/data.csv');

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => {
            // Convert 'yes'/'no' to boolean and '-' to null
            for (const key in data) {
                if (data[key].toLowerCase() === 'yes') {
                    data[key] = true;
                } else if (data[key].toLowerCase() === 'no') {
                    data[key] = false;
                } else if (data[key] === '-') {
                    data[key] = null;
                }
            }
            results.push(data);
        })
        .on('end', async () => {
            try {
                await model.insertMany(results);
                res.status(200).send('Data imported successfully');
            } catch (error) {
                logger.error('Error importing data: ', error);
                res.status(500).send('Error importing data', error);
            }
        });
}


//This function is used to clear the entire data from the database
exports.clearData = async (req, res) => {
    try {
        await model.deleteMany();
        res.status(200).send('Data cleared successfully');
    } catch (error) {
        logger.error('Error clearing data: ', error);
        res.status(500).send('Error clearing data', error);
    }
}

//This function is used to get all the data from the database
exports.getAllData = async (req, res) => {
    try {
        const data = await model.find();
        res.status(200).json({
            status: 'success',
            data: data
        }
        );
    } catch (error) {
        logger.error('Error getting data: ', error);
        res.status(500).send('Error getting data', error);
    }
}

//This function is used to get a single data from the database
exports.getSingleData = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).send('Please make sure the id is correct');
        } else {
            const data = await model.findById(req.params.id);
            if (!data) {
                return res.status(404).send('Data not found');
            }
            res.status(200).json({
                status: 'success',
                data: data
            }
            );
        }
    } catch (error) {
        logger.error('Error getting single data: ', error);
        res.status(404).send('Error getting single data', error);
    }
}

//This function is used to delete a single data from the database
exports.deleteData = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).send('Please make sure the id is correct');
        } else {
            const data = await model.findByIdAndDelete(req.params.id);
            if (!data) {
                return res.status(404).send('Data not found');
            }
            res.status(200).send('Data deleted successfully');
        }
    } catch (error) {
        logger.error('Error deleting data: ', error);
        res.status(500).send('Error deleting data', error);
    }
}
