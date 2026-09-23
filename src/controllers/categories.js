// Import any needed model functions
import { getAllCategories, getCategoryById, getprojectsByCategory } from '../models/categories.js';

const showCategoriesPage = async (req, res) => {
    try {
        const categories = await getAllCategories();
        const title = 'Service Categories';
        res.render('categories', { title, categories });
    } catch (error) {
        console.error('Error loading categories:', error.message);
        res.status(500).send('Unable to load categories.');
    }
}

/* *****************************
 * Display Category Details Page
 * URL: /category/:id
 * *****************************/
const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await getCategoryById(categoryId);
        const projects = await getprojectsByCategory(categoryId);
        const title = category ? `${category.category_name} Projects` : 'Category Details';
        res.render('category', { title, category, projects });
    } catch (error) {
        console.error('Error loading category details:', error.message);
        res.status(500).send('Unable to load category details.');
    }
}


// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage };