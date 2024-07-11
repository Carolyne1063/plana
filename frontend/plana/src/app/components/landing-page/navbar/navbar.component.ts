import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  title:string = 'Plana'
  navBarHome:string = 'Home'
  navBarTours:string = 'Events'
  navBarAbout:string = 'About Us'
  navBarContact:string = 'Contact Us'
}
