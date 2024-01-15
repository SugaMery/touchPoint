import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = true;

  onSubmit() {
      // Add your form submission logic here
      console.log('Form submitted:', this.email, this.password, this.rememberMe);
      // You can add further logic, such as making an API call for authentication
  }
}
