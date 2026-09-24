import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT category_id, category_name
      FROM public.categories;
    `;

    const result = await db.query(query);

    return result.rows;
}

const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO project_categories (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);

    try {
        await db.query(query, [categoryId, projectId]);
    } catch (error) {
        // Code 23503 is the Postgres code for Foreign Key Violation
        if (error.code === '23503') {
            throw new Error(`Assignment failed: Project or Category does not exist.`);
        }
        
        // Handle other DB errors (like connection issues or duplicate entries)
        throw error; 
    }
}


const getCategoryById = async (category_id) => { 
    try {
        const query = `
            SELECT *
            FROM public.categories
            WHERE category_id = $1;
        `;

        const result = await db.query(query, [category_id]);
        return result.rows[0];
    }
    catch (error) {
        console.error('Error fetching category by ID:', error);
        throw error;
    }
};

const getCategoriesForProject = async (project_id) => {
    try {
        const query = `
            SELECT c.*
            FROM public.categories c
            JOIN public.project_categories pc ON c.category_id = pc.category_id
            WHERE pc.project_id = $1;
        `;
        const result = await db.query(query, [project_id]);

        return result.rows;
    }
    catch (error) {
        console.error('Error fetching categories for project:', error);
        throw error;
    }
};

const getprojectsByCategory = async (category_id) => {
    try {
        const query = `
            SELECT p.*
            FROM public.service_projects p
            JOIN public.project_categories pc ON p.project_id = pc.project_id
            WHERE pc.category_id = $1;
        `;

        const result = await db.query(query, [category_id]);
        return result.rows;        
    }
    catch (error) {
        console.error('Error fetching categories for project:', error);
        throw error;
    }
};

export {getAllCategories, 
        getCategoryById, 
        getCategoriesForProject, 
        getprojectsByCategory, 
        assignCategoryToProject};  