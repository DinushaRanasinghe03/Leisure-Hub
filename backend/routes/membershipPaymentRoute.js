const express = require('express');
const router = express.Router();
const membershipController = require('../controllers/membershipController');

router.get('/', membershipController.getPayments);
router.post('/', membershipController.addPayment);
//router.delete('/:id', paymentController.deletePayment);
router.get('/:id', membershipController.getPaymentById);
//router.put('/:id', paymentController.editPayment);

module.exports = router;


