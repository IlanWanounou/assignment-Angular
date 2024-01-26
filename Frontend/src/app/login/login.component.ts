import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService:AuthService, private router: Router) { }

  // pour le formulaire
  user=""
  password=""
  errorMessage: string = '';

  onSubmit(event:any) {
    if(!this.user || !this.password) {
      this.errorMessage = 'Please fill in all fields.';
      this.user = '';
      this.password = '';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }

    const user = this.authService.logIn({name: this.user, password: this.password});
    user.subscribe((user) => {
      if(user.auth) {
        this.authService.setToken(user.token);
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = 'Incorrect login or password. Please try again.';
        console.error('Incorrect login or password');
        this.user = '';
        this.password = '';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }
}
