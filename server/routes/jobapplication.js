import express from 'express';
import { createJobApplication } from '../controllers/JobApplicationController.js';

const router = express.Router();

router.post('/', createJobApplication);

export default router;
