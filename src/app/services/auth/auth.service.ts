import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiError, ApiResponse, UserLoginRequest, UserLoginResponse, UserSignupRequest, UserSignupResponse } from '../../models/auth.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `http://localhost:8080/auth/`;
  private http = inject(HttpClient);

  private router = inject(Router);
  constructor() { }

  // Sign up api
  signup(userSignupRequest:UserSignupRequest): Observable<ApiResponse<UserSignupResponse>> {
    return this.http.post<ApiResponse<UserSignupResponse>>(`${this.apiUrl}sign-up`, userSignupRequest).pipe(
      catchError((err) => {
        let apiError: ApiError = {
          timeStamp: new Date().toISOString(),
          error: err?.error?.error || 'An error occurred',
          status: err?.status?.status || "500"
        };
        return throwError(() => apiError);
      })
    );
  }

  // Login Api
  login(userLoginRequest: UserLoginRequest): Observable<ApiResponse<UserLoginResponse>> {
    return this.http.post<ApiResponse<UserLoginResponse>>(`${this.apiUrl}login`, userLoginRequest).pipe(
      catchError((err) => {
        let apiError: ApiError = {
          timeStamp: new Date().toISOString(),
          error: err?.error?.error || 'An error occurred',
          status: err?.status?.status || "500"
        };
        return throwError(() => apiError);
      })
    );
  }


  isAuthenticated(): boolean {
    if (typeof window === 'undefined') {
      // Not running in the browser
      return false;
    }
    const token = localStorage.getItem('accessToken');
    return !!token;
  }

  navigateByUrl(url: string): void {
    this.router.navigateByUrl(url, {replaceUrl: true});
  }


}
