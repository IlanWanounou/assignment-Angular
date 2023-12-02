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
    
    const user = this.authService.users.find(
      (u) => {
        return u.nom === this.user && u.password === this.password
      }
    )

    if(user) {
      user.isAdmin ? this.authService.logInAdmin() : this.authService.logInUser()
      this.router.navigate(["/home"])
    } else {
      alert("Nom ou mot de passe incorrect")
    }
  }
}