import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';  // Adjust the path to your auth service
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = { name: '', email: '', password: '' };
  error = '';
  success = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.error = '';
    this.success = '';

    this.authService.registerUser(this.user).subscribe(
      (res: any) => {
        this.loading = false;
        this.success = 'Registration successful!';
        localStorage.setItem('authToken', res.authtoken);
        this.router.navigate(['/home']); // Redirect to home or other route
      },
      (err) => {
        this.loading = false;
        this.error = err.error.message || 'Something went wrong. Please try again.';
      }
    );
  }
}
