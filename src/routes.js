import express from 'express';

import { showOrganizationDetailsPage } from './controllers/organizations.js';
import {showOrganizationsPage} from './controllers/organizations.js';
import {showCategoriesPage} from './controllers/categories.js';
import {showProjectsPage} from './controllers/projects.js';
import {showHomePage} from './controllers/index.js';
import {testErrorPage} from './controllers/errors.js';
import {showProjectDetailsPage} from './controllers/projects.js';
import {showCategoryDetailsPage} from './controllers/categories.js';
import {showNewOrganizationForm} from './controllers/organizations.js';
import {processNewOrganizationForm} from './controllers/organizations.js';
import {organizationValidation} from './controllers/organizations.js';


// Routes
const router = express.Router();
  
router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);

// error-handling routes
router.get('/test-error', testErrorPage);
// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);
// Route for project details page
router.get('/project/:id', showProjectDetailsPage);
// Route for category details page
router.get('/category/:id', showCategoryDetailsPage);
// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization' , organizationValidation, processNewOrganizationForm);





export default router;