const express = require('express');
const router = express.Router();
const membershipController = require('../controllers/membershipController');

router.get('/', membershipController.getPayments);
router.post('/', membershipController.addPayment);
router.get('/:id', membershipController.getPaymentById);
router.post('/otp', membershipController.sendOTPtoEmail);
router.post('/verification', membershipController.verifyOTPByEmail);


module.exports = router;


