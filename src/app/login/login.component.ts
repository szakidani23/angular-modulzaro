import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username = '';
  password = '';
  confirmPassword = '';
  fullname = '';
  isRegisterMode = false;

  constructor(private authService: AuthService) {}

  toggleRegisterMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }

  login() {
    this.authService.login(this.username, this.password).then(
      (success) => {
        if (success) {
          /// Do Nothing go further :)
        }
      },
      (error) => {
        alert(error);
      }
    );
  }

  register() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (this.username && this.password && this.fullname) {
      this.authService.register(this.username, this.password, this.fullname);
      // If registration is successful, then switch to login mode
      this.isRegisterMode = false;
      this.confirmPassword = '';
      alert('Registration successful!🥳 You can log in!');
    } else {
      alert('Please fill in all fields!');
    }
  }
}
