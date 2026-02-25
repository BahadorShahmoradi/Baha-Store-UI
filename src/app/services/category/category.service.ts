import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CategoryModel {
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private baseURL =environment.baseURL;


  constructor(private http: HttpClient) { }
 
  createCategory(category: { title: string }): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(`${this.baseURL}/category`, category).pipe(delay(3000));
  }

 
  updateCategory(id: number, category: { title: string }): Observable<CategoryModel> {
    return this.http.put<CategoryModel>(`${this.baseURL}/category/${id}`, category);
  }

  
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/category/${id}`).pipe(
      delay(3000));
  }


  getAllCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`${this.baseURL}/categories`).pipe(
      delay(3000));
  }

}