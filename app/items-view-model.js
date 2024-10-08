import { Observable } from '@nativescript/core';

export function createViewModel() {
    const viewModel = new Observable();
    
    viewModel.items = [
        { name: "Item 1", description: "This is the first item" },
        { name: "Item 2", description: "This is the second item" },
        { name: "Item 3", description: "This is the third item" },
        { name: "Item 4", description: "This is the fourth item" },
        { name: "Item 5", description: "This is the fifth item" },
    ];

    return viewModel;
}