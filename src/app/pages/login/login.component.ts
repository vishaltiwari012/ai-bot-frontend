import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiError, ApiResponse, LoginForm, UserLoginRequest, UserLoginResponse } from '../../models/auth.model';
import { RouterLink } from '@angular/router';
import { SnackbarService } from '../../services/snackbar/snackbar.service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  private auth = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private snackbarService = inject(SnackbarService);
  
  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }


  ngOnInit(): void {
    if(this.auth.isAuthenticated()) {
      this.auth.navigateByUrl('/chat');
    }
  }

  onSubmit(): void {
    if(this.loginForm.valid) {
      const loginRequest: UserLoginRequest = this.loginForm.value;

      this.auth.login(loginRequest).subscribe({
          next: (res: ApiResponse<UserLoginResponse>) => {
          if(res.success) {
            this.snackbarService.openErrorSnackbar(res.message);
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            this.auth.navigateByUrl("/chat");
          }
        },
        error: (error:ApiError) => {
          this.snackbarService.openErrorSnackbar(error.error);
          console.error('Login failed', error);
        }
    })
    }
  }

}
