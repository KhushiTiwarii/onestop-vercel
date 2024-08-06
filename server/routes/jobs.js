import express from 'express';
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJobById,
  deleteJobById
} from '../controllers/jobsController.js'; // Adjust the path if needed

const jobsRouter = express.Router();

jobsRouter.post('/', createJob);
jobsRouter.get('/', getAllJobs);
jobsRouter.get('/:id', getJobById);
jobsRouter.put('/:id', updateJobById);
jobsRouter.delete('/:id', deleteJobById);

export default jobsRouter;
