import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion de devoirs à rendre (Assignments)';
  opened = false;

  constructor  (private authService: AuthService, private router:Router) {
  }
  // pour le formulaire
  user=""
  password=""
  errorMessage: string = '';
  isLoggedIn = true;

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
        this.isLoggedIn = true;
        (console.log('Logged in successfully'+ this.isLoggedIn));
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

  logOut() {
    this.authService.clearToken();
    this.router.navigate(['/home']);
    this.isLoggedIn = false;
  }

}
