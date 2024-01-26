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
    this.router.navigate(['/dashboard']);
  }
  
}
