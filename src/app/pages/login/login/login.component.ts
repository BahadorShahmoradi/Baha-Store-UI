import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { HighlightDirective } from '../../../directives/highlight.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,ButtonModule,CardModule,InputTextModule,HighlightDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  login() {
    if (this.username === 'admin' && this.password === '123') {
      localStorage.setItem('user', 'Login component,Logged in.');
      this.router.navigate(['/category']);
    }
    else {
      alert('Invalid username or password.');
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']).then(() => {
      console.log('User logged out and redirect to login.')
    });
  }
}