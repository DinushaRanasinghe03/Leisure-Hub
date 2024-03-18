const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.get('/', paymentController.getPayments);
router.post('/', paymentController.addPayment);
router.delete('/:id', paymentController.deletePayment);
router.get('/:id', paymentController.getPaymentById);
router.put('/:id', paymentController.editPayment);

module.exports = router;


