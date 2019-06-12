const payrollValidators = require('../validators/payroll');
const marketerService = require('../services/marketer-service');
const express = require('express');

//set up express Router
const router = express.Router();

//get Marketers data from ZOHO
router.post('/marketers', (req, res, next) => {
    payrollValidators.validate(req.body)
        .then(() => marketerService.getMarketers(req.body, res))
        .catch(next)
});

module.exports = router;