var express = require('express');
var controller = require('../components/table');

var router = express.Router();

router.get("/addData", controller.addData);
router.delete("/clearData", controller.clearData);
router.get("/getAllData", controller.getAllData);
router.get("/getSingleData/:id", controller.getSingleData);
router.delete("/deleteData/:id", controller.deleteData);
router.post("/searchData", controller.searchData);
router.post("/filterData", controller.filterData);

module.exports = router;