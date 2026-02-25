import { Routes } from '@angular/router';
// import { authGuard } from './guards/auth.guard';
import { CategoryComponent } from './pages/category/category.component';
import { LoginComponent } from './pages/login/login/login.component';
import { authGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
    { path: 'category', component: CategoryComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/category', pathMatch: 'full' }
];
