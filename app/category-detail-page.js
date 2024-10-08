import { createViewModel } from './category-detail-view-model';

export function onNavigatingTo(args) {
    const page = args.object;
    const categoryId = page.navigationContext.categoryId;
    page.bindingContext = createViewModel(categoryId);
}