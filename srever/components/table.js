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
            
            results.push(data);
        })
        .on('end', async () => {
            try {
                await model.insertMany(results);
                res.status(200).json({
                    status: 'success',
                });
            } catch (error) {
                logger.error('Error importing data: ', error);
                res.status(500).send({
                    message: 'Error importing data',
                    error: error
                });
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
        res.status(500).send({
            message : 'Error clearing data', 
            error: error});
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
        res.status(500).send({
            message : 'Error getting data', 
            error: error});
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
        res.status(404).send({
            message : 'Error getting single data',
            error:  error });
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
        res.status(500).send({
            message : 'Error deleting data', 
            error : error});
    }
}

//This function is used to search the data from the database
exports.searchData = async (req, res) => {
    try {
        
        const searchValue = req.body.searchValue;
        const sanitizedSearchValue = searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters for regex
        const data = await model.find({
            Brand: { $regex: new RegExp(sanitizedSearchValue, 'i') }
        });

        res.status(200).json({
            status: 'success',
            data: data
        }
        );
    } catch (error) {
        logger.error('Error searching data: ', error);
        console.log(error);
        res.status(501).send({
            message: 'Error searching data',
            error: error.message
        });
    }
}

//This function is used to perform the filering operation on the data
exports.filterData = async (req, res) => {
    var { column_name, criteria, filter_data } = req.body;
    // Sanitize user inputs
    column_name = column_name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    criteria = criteria.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    filter_data = filter_data.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    if (!column_name || !criteria ) {
        return res.status(400).send({
            status: 'fail',
            message: 'Please provide the required fields'
        });
    }

    const schemaPaths = Object.keys(model.schema.paths);
    if (!schemaPaths.includes(column_name)) {
        return res.status(400).send({
            status: 'fail',
            message: 'Invalid column name'
        });
    }

    let filter = {};
    switch (criteria) {
        case 'contains':
            filter[column_name] = { $regex: new RegExp(filter_data, 'i') };
            break;
        case 'equals':
            filter[column_name] = filter_data;
            break;
        case 'start_with':
            filter[column_name] = { $regex: new RegExp('^' + filter_data, 'i') };
            break;
        case 'ends_with':
            filter[column_name] = { $regex: new RegExp(filter_data + '$', 'i') };
            break;
        case 'is_empty':
            filter[column_name] = { $in: [null, ''] };
            break;
        default:
            return res.status(400).send({
                status: 'fail',
                message: 'Invalid criteria'
            });
    }

    try {
        const data = await model.find(filter);
        res.status(200).json({
            status: 'success',
            data: data
        });
    } catch (error) {
        logger.error('Error filtering data: ', error);
        res.status(500).send({
            status: 'fail',
            message: 'Error filtering data' + error.message,
        });
    }
}