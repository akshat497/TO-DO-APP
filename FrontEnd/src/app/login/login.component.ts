import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { email, password } = form.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          if (response.success && response.data && response.data.authtoken) {
            console.log('Login successful', response.message);
            // Store the token in localStorage
            localStorage.setItem('authToken', response.data.authtoken);

            // Fetch user data
            this.authService.fetchUser(response.data.authtoken).subscribe({
              next: (userResponse) => {
                if (userResponse.success && userResponse.data) {
                  console.log('User data:', userResponse.data);
                  this.router.navigate(['/about']);
                  this.authService.setUserData(userResponse.data);
                  // Handle user data (e.g., store in local state or display)
                } else {
                  console.error(
                    'Unexpected user response structure:',
                    userResponse
                  );
                }
              },
              error: (error) => {
                console.error('Failed to fetch user data', error);
              },
            });
          } else {
            console.error('Unexpected response structure:', response);
          }
        },
        error: (error) => {
          console.error('Login failed', error);
        },
      });
    }
  }
}
