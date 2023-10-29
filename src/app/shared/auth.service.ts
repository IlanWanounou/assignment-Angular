import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  isAdminUser = false;

  logInUser() {
    this.isAdminUser = false;
    this.loggedIn = true;
  }

  logInAdmin() {
    this.loggedIn = true;
    this.isAdminUser = true;
  }

  logOut() {
    this.isAdminUser = false;
    this.loggedIn = false;
  }
  
  users:User[] = [
    {
      nom:"admin",
      password:"admin",
      isAdmin:true
    },
    {
      nom:"user",
      password:"user",
      isAdmin:false
    }
  ];


  isLogged() {
    const isUserLogged = new Promise(
      (resolve, reject) => {
       resolve(this.loggedIn);
      }
    );
    return isUserLogged;
  }

  isAdmin() {
    const isAdmin = new Promise(
      (resolve, reject) => {
        resolve(this.isAdminUser);
      }
    );
    return isAdmin;
  }

  constructor() { }
}
