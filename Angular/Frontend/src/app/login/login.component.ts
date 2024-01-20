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

  onSubmit(event:any) {
    if(!this.user || !this.password) {
      alert("Veuillez saisir un nom et un mot de passe")
      return;
    }

    const user = this.authService.logIn({name: this.user, password: this.password});
    user.subscribe((user) => {
      if(user.auth) {
        this.authService.setToken(user.token)
        this.router.navigate(['/home'])
      } else
        alert("Erreur d'authentification")
    });
  }
}
