import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('accessToken');
  // Define the public endpoints that don't require a token
  const publicEndpoints = ['/login', '/signup'];

  // Check if the request URL matches any public endpoint
  const isPublicEndpoint = publicEndpoints.some(endpoint =>
    req.url.includes(endpoint)
  );

  // If it's a public endpoint, skip adding the Authorization header
  if (isPublicEndpoint) {
    return next(req);
  }
  
  const authReq = token ? 
  req.clone({
    setHeaders: {Authorization: `Bearer ${token}`}
  }) 
  : req;

  return next(authReq).pipe(
    catchError((error : HttpErrorResponse) => {
      if(error.status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    }
  )
);
};
