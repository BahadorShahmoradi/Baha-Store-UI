import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryFilterPipe } from '../../pipes/category/category-filter.pipe';
import { CategoryModel, CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule, CategoryFilterPipe],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})

export class CategoryComponent implements OnInit {
  categories: CategoryModel[] = [];
  searchTerm: string = '';

  form: { id: number | null; title: string } = { id: null, title: '' }
  isEditMode: boolean = false;

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.loadCategories();
  };

  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error loading categories: ', err)
    });
  }
   
    private createCategory(): void {
    if (!this.form.title.trim()) return;

    this.categoryService.createCategory({ title: this.form.title.trim() }).subscribe({
      next: () => this.reloadAfterAction(),
      error: (err) => console.error('Error creating category: ', err)
    });
  }
 
  private updateCategory(): void {
    if (this.form.id === null || !this.form.title.trim()) return;

    this.categoryService.updateCategory(this.form.id, { title: this.form.title.trim() }).subscribe({
      next: () => this.reloadAfterAction(),
      error: (err) => console.error('Error updating category: ', err)
    });
  }
  handleSubmit(): void {
    if (this.isEditMode)
      this.updateCategory();
    else
      this.createCategory();
  }

  handleEdit(category: CategoryModel): void {
    this.form = { id: category.id, title: category.title };
    this.isEditMode = true;
  }

  handleDelete(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => this.loadCategories(),
        error: (err) => console.error('failed to delete category: ', err)
      });
    }
  }

  private reloadAfterAction(): void {
    this.resetForm();
    this.loadCategories();
  }

  resetForm(): void {
    this.form = { id: null, title: '' };
    this.isEditMode = false;
  }



  handleLogout(): void {
    if (confirm('Are you sure you want to log out?')) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}