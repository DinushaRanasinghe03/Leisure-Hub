import express from 'express';
const router = express.Router();
import { getPaymentSummary, getPaymentSummaryById, getTotal } from "../controllers/paymentSummaryController.js";

router.get('/', getPaymentSummary);
router.get('/:id',getPaymentSummaryById);
router.post('/sum',getTotal);



export default router;


