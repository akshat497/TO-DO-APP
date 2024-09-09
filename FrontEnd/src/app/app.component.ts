import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEnd';
  isLoggedIn: boolean = false;
  constructor(private router: Router) {}
  ngOnInit(): void {
    // Check if token exists in localStorage
    this.isLoggedIn = !!localStorage.getItem('authToken');
  }

  logout(): void {
    // Clear the token from localStorage
    localStorage.removeItem('authToken');
    this.isLoggedIn = !!localStorage.getItem('authToken');
    // Optionally navigate to the login page or refresh the current page

    this.router.navigate(['/login']);
  }
}
