import { Observable, Http } from '@nativescript/core';
import { navigate } from '@nativescript/core/ui/frame';

const API_URL = 'https://your-strapi-api-url.com'; // Replace with your Strapi API URL

export function createViewModel() {
    const viewModel = new Observable();
    viewModel.username = "";
    viewModel.password = "";
    viewModel.isLoading = false;

    viewModel.onLogin = async () => {
        viewModel.set('isLoading', true);
        try {
            const response = await Http.request({
                url: `${API_URL}/auth/local`,
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    identifier: viewModel.username,
                    password: viewModel.password
                })
            });

            const result = response.content.toJSON();
            if (result.jwt) {
                // Store the JWT token securely (you might want to use a more secure storage method)
                global.token = result.jwt;
                navigate({
                    moduleName: "categories-page",
                    clearHistory: true
                });
            } else {
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error('Login error:', error);
            alert("An error occurred during login. Please try again.");
        } finally {
            viewModel.set('isLoading', false);
        }
    };

    return viewModel;
}