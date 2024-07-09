import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  @Output() selectSection = new EventEmitter<string>();

  onSelectSection(section: string) {
    this.selectSection.emit(section);
  }
}
