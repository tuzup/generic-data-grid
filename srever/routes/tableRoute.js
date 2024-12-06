var express = require('express');
var controller = require('../components/table');

var router = express.Router();

router.get("/addData", controller.addData);
router.delete("/clearData", controller.clearData);
router.get("/getAllData", controller.getAllData);
router.get("/getSingleData/:id", controller.getSingleData);

module.exports = router;