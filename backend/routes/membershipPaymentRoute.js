import express from 'express';
const router = express.Router();
import { getPayments, addPayment, getPaymentById, sendOTPtoEmail, verifyOTPByEmail } from "../controllers/membershipPaymentController.js";

router.get('/',getPayments);
router.post('/',addPayment);
router.get('/:id',getPaymentById);
router.post('/otp',sendOTPtoEmail);
router.post('/verification',verifyOTPByEmail);

export default router;



