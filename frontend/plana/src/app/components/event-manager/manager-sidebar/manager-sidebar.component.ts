import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-manager-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './manager-sidebar.component.html',
  styleUrl: './manager-sidebar.component.css'
})
export class ManagerSidebarComponent {
  @Output() selectSection = new EventEmitter<string>();

  onSelectSection(section: string) {
    this.selectSection.emit(section);
  }
}
