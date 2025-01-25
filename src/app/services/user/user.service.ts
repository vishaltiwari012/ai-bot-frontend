import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/auth.model';
import { UserProfileResponse } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `http://localhost:8080/user/`;
  private http = inject(HttpClient);

  // Get User Profile Api
  getUserProfile(): Observable<ApiResponse<UserProfileResponse>> {
    return this.http.get<ApiResponse<UserProfileResponse>>(`${this.apiUrl}profile`);
  }
}
