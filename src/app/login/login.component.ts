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

  register() {}
}
