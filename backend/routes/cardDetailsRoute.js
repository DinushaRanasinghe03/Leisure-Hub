import express from 'express';
import { getCardPayments, addCardPayment, sendOTPtoEmail, verifyOTPByEmail, deleteCardPayment,getCardPaymentById,editCardPayment } from "../controllers/cardDetailsController.js";
const router = express.Router();


router.get('/', getCardPayments);
router.post('/',addCardPayment);
router.post('/otp', sendOTPtoEmail);
router.post('/verification', verifyOTPByEmail);
router.delete('/:id', deleteCardPayment);
router.get('/:id', getCardPaymentById);
router.put('/:id', editCardPayment);

export default router;

