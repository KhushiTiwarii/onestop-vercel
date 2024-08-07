import JobApplication from '../models/JobApplicationSchema.js';
import Job from '../models/JobsSchema.js'; // Adjust the path as needed

// Get all job applications
export const getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find()
      .populate('job', 'position') // Populate job details
      .exec();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch applications.', error });
  }
};


export const createJobApplication = async (req, res) => {
  const { name, phone, resume, jobId } = req.body;

  try {
    // Check if jobId is valid
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({ message: 'Invalid job ID.' });
    }

    const jobApplication = new JobApplication({
      name,
      phone,
      resume,
      jobId: jobId,
      jobTitle: job.position, // Include job title from the Job model
    });

    await jobApplication.save();
    res.status(201).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit application.', error });
  }
};


// Update the status of a job application
export const updateApplicationStatus = async (req, res) => {
  const { id } = req.params; // Get application ID from params
  const { status } = req.body; // Get new status from request body

  try {
    // Validate status value
    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const application = await JobApplication.findByIdAndUpdate(id, { status }, { new: true });
    if (!application) {
      return res.status(404).json({ message: 'Application not found.' });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update application status.', error });
  }
};
