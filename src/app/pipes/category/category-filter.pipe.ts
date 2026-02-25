import { Pipe, PipeTransform } from '@angular/core';
import { CategoryModel } from '../../services/category/category.service';


@Pipe({
  name: 'categoryFilter'
})

export class CategoryFilterPipe implements PipeTransform {

  transform(categories: CategoryModel[], searchTerm: string): CategoryModel[] {

    if (!searchTerm) return categories;

    return categories.filter(cat =>
      cat.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
