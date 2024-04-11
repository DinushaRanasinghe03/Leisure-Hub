// routes/contactRoutes.js

import express from 'express';
import {
  getAllContact,
  addContact,
  getById,
  updateContact,
  deleteContact,
} from '../controllers/ContactUsControllers.js'; // Adjust the path as needed

const router = express.Router();

router.get('/', getAllContact);
router.post('/', addContact);
router.get('/:id', getById);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;
