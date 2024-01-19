import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from '../models/user/user.module';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const user: User = { email: this.email, password: this.password };
  
    this.authService.login(user).subscribe(
      (response) => {
        // Save user information to local storage
        localStorage.setItem('currentUser', JSON.stringify(response.user));
  
        // Optionally, save a flag indicating that the user is logged in
        localStorage.setItem('isLoggedIn', 'true');
  
        this.router.navigate(['/dashboard']);
        console.log(response);
        // Handle successful login here
      },
      (error) => {
        console.log("not good");
        // Handle login error here
      }
    );
  }
  
}
