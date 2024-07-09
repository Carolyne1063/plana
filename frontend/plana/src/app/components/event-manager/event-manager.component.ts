import { Component } from '@angular/core';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerBookingsComponent } from './manager-bookings/manager-bookings.component';
import { ManagerTicketsComponent } from './manager-tickets/manager-tickets.component';
import { ManagerUsersComponent } from './manager-users/manager-users.component';
import { ManagerSettingsComponent } from './manager-settings/manager-settings.component';
import { ManagerSidebarComponent } from './manager-sidebar/manager-sidebar.component';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-manager',
  standalone: true,
  imports: [CommonModule,
    ManagerSidebarComponent,
    ManagerHomeComponent,
    ManagerBookingsComponent,
    ManagerTicketsComponent,
    ManagerUsersComponent,
    ManagerSettingsComponent
  ],
  templateUrl: './event-manager.component.html',
  styleUrl: './event-manager.component.css'
})
export class EventManagerComponent {
  selectedSection: string = 'home';
  onSectionSelected(section: string){
    this.selectedSection = section;
  }
}
