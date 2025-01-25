import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((error:HttpErrorResponse) => {
      if(error.status === 404) {
        router.navigateByUrl("**");
      } else if (error.status === 500) {
        // Handle other error statuses here (e.g., show a generic error page)
        alert('An unexpected error occurred. Please try again later.');
      }
      return throwError(() => error);
    })
  );
};
