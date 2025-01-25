import { Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'signup',
        loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent)
    },
    {
        path:'my-profile',
        loadComponent: () => import('./pages/my-profile/my-profile.component').then(m => m.MyProfileComponent)
    },
    {
        path: 'chat',
        loadComponent: () => import('./pages/chat/chat.component').then(m => m.ChatComponent), // lazy load chat component (feature of standalone component)
        canActivate: [authGuard]
    },
    {
        path: 'cricket',
        loadComponent: () => import('./pages/cricket/cricket.component').then(m => m.CricketComponent),
        canActivate: [authGuard]
        
    },
    {
        path: 'image',
        loadComponent: () => import('./pages/image/image.component').then(m => m.ImageComponent),
        canActivate: [authGuard]
    },
    {
        path: 'feedback',
        loadComponent: () => import('./pages/feedback/feedback.component').then(m => m.FeedbackComponent),
        canActivate: [authGuard]
    },
    {
        path: 'help-us',
        loadComponent: () => import('./pages/helpus/helpus.component').then(m => m.HelpusComponent),
        canActivate: [authGuard]
    }

];
