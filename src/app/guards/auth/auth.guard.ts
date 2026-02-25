import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isAuthenticated = checkAuthentication();

  if (isAuthenticated) {
    console.log('AuthGuard: User authenticated.');
    return true;
  }
  else {
    console.log('AuthGuard: User not authenticated.')
    router.navigate(['/login']);
    return false;
  }
};

function checkAuthentication(): boolean {
  const user = localStorage.getItem('user');
  console.log('User status: ', user);
  return !!user;
}