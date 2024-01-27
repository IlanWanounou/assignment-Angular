import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export const AuthGuardAdmin: CanActivateFn = (route:any , state: any) => {
    let authService = inject(AuthService);
    let router = inject(Router);
    let snackBar = inject(MatSnackBar);

    if(authService.getToken() == null)   {
      console.log("Vous n'êtes pas connecté ! Navigation refusée ! ")
      snackBar.open("Vous n'êtes pas connecté !", 'OK', {
          duration: 2000,
          horizontalPosition : 'center',
          verticalPosition: 'top'
        });
      router.navigate(["/home"]) ;
      return false;
    } else {
      return authService.isAdmin().toPromise().then((res) => {
        if (res.isAdmin) {
          console.log(
            "Vous êtes connecté en tant qu'admin, navigation autorisée !"
          );
          return true;
        } else {
          console.log(
            "Vous n'êtes pas connecté en tant qu'admin ! Navigation refusée ! "
          );
          snackBar.open("Vous n'êtes pas connecté en tant qu'admin !", 'OK', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          router.navigate(['/home']);
          return false;
        }
      })

    }
  }
    export const AuthGuardLogged: CanActivateFn = (route:any , state: any) => {
      let authService = inject(AuthService);
      let router = inject(Router);

     if(authService.getToken() != null)   {
      console.log("Vous êtes connecté, navigation autorisée !");
      return true;
      } else {
        console.log("Vous n'êtes pas connecté ! Navigation refusée ! ");
        const snackBar = inject(MatSnackBar);
        snackBar.open("Vous n'êtes pas connecté !", 'OK', {
          duration: 2000,
          horizontalPosition : 'center',
          verticalPosition: 'top'
        });
        router.navigate(['/home']);
        return false;
      }
    }
