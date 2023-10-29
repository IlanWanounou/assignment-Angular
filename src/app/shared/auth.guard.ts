import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const AuthGuardAdmin: CanActivateFn = (route:any , state: any) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  return authService.isAdmin().then(authentifie => {
    if (authentifie) {
    console.log("Vous êtes admin, navigation autorisée !");
    return true;
    } else {
    console.log ("Vous n'êtes pas admin ! Navigation refusée ! ")
    router.navigate(["/home"]) ;
    return false;
    }
    });
  }

  export const AuthGuardLogged: CanActivateFn = (route:any , state: any) => {
    let authService = inject(AuthService);
    let router = inject(Router);
  
    return authService.isLogged().then(authentifie => {
      if (authentifie) {
      console.log("Vous êtes connecté, navigation autorisée !");
      return true;
      } else {
      console.log ("Vous n'êtes pas connecté ! Navigation refusée ! ")
      router.navigate(["/login"]) ;
      return false;
      }
      });
    }

