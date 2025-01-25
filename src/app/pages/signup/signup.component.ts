import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiError, ApiResponse, UserSignupRequest, UserSignupResponse } from '../../models/auth.model';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  private auth = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private snackbarService = inject(SnackbarService);
    
  signupForm: FormGroup;
  
    constructor() {
      this.signupForm = this.formBuilder.group({
        name: ['', [Validators.required]],
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
    if(this.signupForm.valid) {
      const signupRequest : UserSignupRequest = this.signupForm.value;

      this.auth.signup(signupRequest).subscribe({
        next: (res: ApiResponse<UserSignupResponse>) => {
          if(res.success) {
            this.snackbarService.openErrorSnackbar(res.message);
            this.auth.navigateByUrl("/login");
          }
        },
        error : (error : ApiError) => {
          this.snackbarService.openErrorSnackbar(error.error);
          console.error('Login failed', error);
        }
      })
    }
  }
}
