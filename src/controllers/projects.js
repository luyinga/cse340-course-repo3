// Import any needed model functions
import { getAllProjects } from '../models/projects.js';

const showProjectsPage = async (req, res) => {
  try {
    const projects = await getAllProjects();
    const title = 'Service Projects';
    res.render('projects', { title, projects });
  } catch (error) {
    console.error('Error loading projects:', error.message);
    res.status(500).send('Unable to load projects.');
  }
}


// Export any controller functions
export { showProjectsPage };