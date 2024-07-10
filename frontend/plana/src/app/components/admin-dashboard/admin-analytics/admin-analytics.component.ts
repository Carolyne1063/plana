import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-analytics',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-analytics.component.html',
  styleUrl: './admin-analytics.component.css'
})
export class AdminAnalyticsComponent {
  johnEvents = [
    { id: 1, attendees: 300, emptySeats: 100, revenue: 12000 },
    { id: 2, attendees: 350, emptySeats: 50, revenue: 14000 },
    { id: 3, attendees: 360, emptySeats: 40, revenue: 15000 },
    { id: 4, attendees: 280, emptySeats: 120, revenue: 11000 },
    { id: 5, attendees: 320, emptySeats: 80, revenue: 13000 }
  ];

  janeEvents = [
    { id: 1, attendees: 550, emptySeats: 50, revenue: 22000 },
    { id: 2, attendees: 490, emptySeats: 110, revenue: 20000 },
    { id: 3, attendees: 510, emptySeats: 90, revenue: 21000 },
    { id: 4, attendees: 530, emptySeats: 70, revenue: 22000 },
    { id: 5, attendees: 460, emptySeats: 140, revenue: 19000 },
    { id: 6, attendees: 520, emptySeats: 80, revenue: 21000 },
    { id: 7, attendees: 550, emptySeats: 50, revenue: 22000 }
  ];

  emilyEvents = [
    { id: 1, attendees: 190, emptySeats: 60, revenue: 7600 },
    { id: 2, attendees: 220, emptySeats: 30, revenue: 8800 },
    { id: 3, attendees: 200, emptySeats: 50, revenue: 8000 }
  ];

  constructor(private renderer: Renderer2) {}

  toggleBreakdown(manager: string) {
    const breakdown = document.getElementById(`${manager}-breakdown`);
    const button = document.querySelector(`button[click*="${manager}"]`) as HTMLButtonElement;

    if (breakdown) {
      if (breakdown.style.display === 'none' || !breakdown.style.display) {
        this.renderer.setStyle(breakdown, 'display', 'block');
        if (button) {
          button.textContent = 'Hide Event Breakdown';
        }
      } else {
        this.renderer.setStyle(breakdown, 'display', 'none');
        if (button) {
          button.textContent = 'View Event Breakdown';
        }
      }
    }
  }
}
