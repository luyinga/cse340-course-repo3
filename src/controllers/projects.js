// Import any needed model functions
import { getAllProjects, 
         getUpcomingProjects, 
         getProjectDetails 
} from '../models/projects.js';


const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
  try {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';
    res.render('projects', { title, projects });
  } catch (error) {
    console.error('Error loading projects:', error.message);
    res.status(500).send('Unable to load projects.');
  }
}

const showProjectDetailsPage = async (req, res) => {
  const projectId = req.params.id;
  try {
    const projectDetails = await getProjectDetails(projectId);

    // FETCH THE CATEGORIES HERE
    const assignedCategories = await getCategoriesByServiceProjectId(projectId);

    const title = 'Project Details';
    res.render('project', { title, projectDetails, assignedCategories });
  } catch (error) {
    console.error('Error loading project details:', error.message);
    res.status(500).send('Unable to load project details.');
  }
}

// Export any controller functions
export { showProjectsPage, showProjectDetailsPage};