import { Component, inject } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion de devoirs à rendre (Assignments)';
  opened = false;

  constructor  (private authService: AuthService, private router:Router, private snackBar: MatSnackBar) {
  }
  // pour le formulaire
  user=""
  password=""
  errorMessage: string = '';
  isLoggedIn = false;

  ngOnInit() : void {

    this.isLoggedIn = true ?  this.authService.getToken() != null : false;
  }

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
        this.snackBar.open("Connexion réussie !", 'OK', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
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
      this.user = '';
      this.password = '';
    });
  }

  logOut() {
    this.authService.logOut();
    this.isLoggedIn = false;
  }

}
