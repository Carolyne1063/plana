import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent {
  @Output() selectSection = new EventEmitter<string>();

  onSelectSection(section: string) {
    this.selectSection.emit(section);
  }
}
