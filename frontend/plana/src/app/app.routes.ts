import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter } from '@angular/router';

import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { EventManagerComponent } from './components/event-manager/event-manager.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';


const routes: Routes = [
    { path: 'landing', component: LandingPageComponent },
    { path: 'login', component: LoginRegisterComponent },
    { path: 'manager', component: EventManagerComponent },
    { path: 'user-dashboard', component: UserDashboardComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    { path: '**', redirectTo: 'landing' }
];

export class AppRoutingModule { }

export { routes };