// Import any needed model functions
import { getAllCategories } from '../models/categories.js';

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


// Export any controller functions
export { showCategoriesPage };