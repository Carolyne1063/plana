import { Component } from '@angular/core';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {
  openForm() {
    const form = document.getElementById("bookingForm");
    if (form) form.style.display = "block";
    document.body.classList.add("blur");
  }

  closeForm() {
    const form = document.getElementById("bookingForm");
    if (form) form.style.display = "none";
    document.body.classList.remove("blur");
  }
}
