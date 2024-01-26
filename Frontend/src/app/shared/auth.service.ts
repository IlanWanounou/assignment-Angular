import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8010/api/user';

  logIn(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.getToken() || '', // Utilisez un string vide si getToken est null
    });
    return this.http.post<any>(this.url, data, { headers });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  isAdmin(): Observable<any> {
    // Construisez les en-têtes à chaque fois pour assurer qu'ils sont à jour
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.getToken() || '', // Utilisez un string vide si getToken est null
    });
    return this.http.get<any>(this.url + '/isAdmin', { headers });
  }

  // Les autres méthodes sont commentées pour l'instant
}


  /*logInUser() {
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

  isLogged() {
    const isUserLogged = new Promise(
      (resolve, reject) => {
       resolve(this.loggedIn);
      }
    );
    return isUserLogged;
  }



  constructor() { }
  */

