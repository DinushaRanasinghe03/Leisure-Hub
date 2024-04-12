import express from 'express';
import { getPayments, addPayment, deletePayment, getPaymentById, editPayment } from "../controllers/paymentController.js";
const router = express.Router();

router.get('/', getPayments);
router.post('/', addPayment);
router.delete('/:id', deletePayment);
router.get('/:id', getPaymentById);
router.put('/:id', editPayment);

export default router;