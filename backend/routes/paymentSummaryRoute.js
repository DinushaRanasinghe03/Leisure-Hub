const express = require('express');
const router = express.Router();
const paymentSummaryController = require('../controllers/paymentSummaryController');

router.get('/', paymentSummaryController.getPaymentSummary);
router.get('/:id', paymentSummaryController.getPaymentSummaryById);
router.get('/sum', paymentSummaryController.getTotal);



module.exports = router;


