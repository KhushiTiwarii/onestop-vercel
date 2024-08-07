import express from 'express';
import { 
  createJobApplication, 
  getAllApplications, 
  deleteApplication, 
  updateApplicationStatus, 
  getUserApplications 
} from '../controllers/JobApplicationController.js';

const router = express.Router();

router.post('/', createJobApplication); // Create a new job application
router.get('/', getAllApplications); // Get all job applications
router.patch('/:id/status', updateApplicationStatus); // Update the status of a job application
router.delete('/:id', deleteApplication); // Delete a job application
router.get('/user/:userId', getUserApplications); // Get all job applications for a specific user

export default router;

