import { Observable, Http } from '@nativescript/core';

const API_URL = 'https://your-strapi-api-url.com'; // Replace with your Strapi API URL

export function createViewModel(categoryId) {
    const viewModel = new Observable();
    viewModel.category = null;
    viewModel.isLoading = false;

    viewModel.loadCategoryDetails = async () => {
        viewModel.set('isLoading', true);
        try {
            const response = await Http.request({
                url: `${API_URL}/categories/${categoryId}?populate=*`,
                method: 'GET',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${global.token}`
                }
            });

            const result = response.content.toJSON();
            viewModel.set('category', result.data.attributes);
        } catch (error) {
            console.error('Error loading category details:', error);
            alert("An error occurred while loading category details.");
        } finally {
            viewModel.set('isLoading', false);
        }
    };

    // Load category details when the view model is created
    viewModel.loadCategoryDetails();

    return viewModel;
}