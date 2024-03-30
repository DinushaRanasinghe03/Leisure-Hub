const express = require('express');
const router = express.Router();
const cardDetailsController = require('../controllers/cardDetailsController');

router.get('/', cardDetailsController.getCardPayments);
router.post('/', cardDetailsController.addCardPayment);
router.delete('/:id', cardDetailsController.deleteCardPayment);
router.get('/:id', cardDetailsController.getCardPaymentById);
router.put('/:id', cardDetailsController.editCardPayment);

module.exports = router;


