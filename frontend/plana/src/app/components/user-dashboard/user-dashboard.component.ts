import { Component } from '@angular/core';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';


import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule,
    UserSidebarComponent,
    UserHomeComponent,
    UserBookingsComponent,
    UserSettingsComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  selectedSection: string = 'home';
  onSectionSelected(section: string){
    this.selectedSection = section;
  }
}

