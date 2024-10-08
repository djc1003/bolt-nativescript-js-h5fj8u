import { Observable, Http } from '@nativescript/core';
import { navigate } from '@nativescript/core/ui/frame';

const API_URL = 'https://your-strapi-api-url.com'; // Replace with your Strapi API URL

export function createViewModel() {
    const viewModel = new Observable();
    viewModel.categories = [];
    viewModel.isLoading = false;

    viewModel.loadCategories = async () => {
        viewModel.set('isLoading', true);
        try {
            const response = await Http.request({
                url: `${API_URL}/categories`,
                method: 'GET',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${global.token}`
                }
            });

            const result = response.content.toJSON();
            viewModel.set('categories', result.data);
        } catch (error) {
            console.error('Error loading categories:', error);
            alert("An error occurred while loading categories.");
        } finally {
            viewModel.set('isLoading', false);
        }
    };

    viewModel.onCategoryTap = (args) => {
        const tappedItem = viewModel.categories[args.index];
        navigate({
            moduleName: "category-detail-page",
            context: { categoryId: tappedItem.id },
            animated: true
        });
    };

    // Load categories when the view model is created
    viewModel.loadCategories();

    return viewModel;
}