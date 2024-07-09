import { Component } from '@angular/core';
import { AllEventsComponent } from './all-events/all-events.component';
import { AllBookingsComponent } from './all-bookings/all-bookings.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { AdminAnalyticsComponent } from './admin-analytics/admin-analytics.component';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, 
    AdminSidebarComponent,
    AllEventsComponent,
    AllBookingsComponent,
    AllUsersComponent,
    AdminAnalyticsComponent,
    AdminSettingsComponent,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  selectedSection: string = 'events';
  onSectionSelected(section: string){
    this.selectedSection = section;
  }
}
