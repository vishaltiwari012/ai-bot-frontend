import { FormControl } from "@angular/forms";

export interface LoginForm {
    email : FormControl<string>,
    password: FormControl<string>
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    timestamp: string;
}


export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface UserLoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface ApiError {
    timeStamp: string;  // Represent LocalDateTime as ISO string in Angular
    error: string;
    status: string;     // You can also use `number` if it's represented as a numeric status code
}


export interface UserSignupRequest {
    name: string;
    email: string;
    password: string;
}


export interface UserSignupResponse {
    id:number;
    name: string;
    email: string;
}