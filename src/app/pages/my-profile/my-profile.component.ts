import { Component, inject, OnInit } from '@angular/core';
import { UserProfileResponse } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { ApiError, ApiResponse } from '../../models/auth.model';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  imports: [],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{
  private userService = inject(UserService);
  private snackbarService = inject(SnackbarService);
  private router = inject(Router);
  user?:UserProfileResponse;
  errorMessage!: string;
  
  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (res : ApiResponse<UserProfileResponse>) => {
        if(res.success) {
          this.user = res.data;
        }
      },
      error: (error) =>{
        this.errorMessage = 'Unable to load profile. Please try again later.'
        this.snackbarService.openErrorSnackbar(this.errorMessage);
      }
    })
  }


  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigateByUrl('/login');
  }
}
