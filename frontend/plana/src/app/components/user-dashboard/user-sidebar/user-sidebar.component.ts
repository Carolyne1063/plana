import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../services/authService/auth.service';
import { UserService } from '../../../services/userService/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-sidebar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent {
  @Output() selectSection = new EventEmitter<string>();
  userImage?: string; 
  userName: string = 'UserName'; 

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchUserData();
  }

  onSelectSection(section: string) {
    this.selectSection.emit(section);
  }

  fetchUserData() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userService.getUserById(userId).subscribe(user => {
        this.userImage = user.image || ''; 
        this.userName = user.firstname || 'UserName'; 
      });
    } else {
      console.error('User ID is null');
    }
  }
}
