const express = require('express');
const router = express.Router();
const cardDetailsController = require('../controllers/cardDetailsController');

router.get('/', cardDetailsController.getCardPayments);
router.post('/', cardDetailsController.addCardPayment);
router.post('/otp', cardDetailsController.sendOTPtoEmail);
router.post('/verification', cardDetailsController.verifyOTPByEmail);
router.delete('/:id', cardDetailsController.deleteCardPayment);
router.get('/:id', cardDetailsController.getCardPaymentById);
router.put('/:id', cardDetailsController.editCardPayment);

module.exports = router;


