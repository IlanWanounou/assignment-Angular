import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.getToken()!,
    }),
  };
  private HttpOptionsAdmin = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.getToken()!,
    }),
  };

  constructor(private http: HttpClient) {}

  url = 'http://localhost:8010/api/user';

  logIn(data: any): Observable<any> {
    return this.http.post<any>(this.url, data, this.HttpOptions);
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
    this.HttpOptionsAdmin.headers.append(
      'x-access-token',
      this.getToken()!
    );
    return this.http.get<any>(this.url + '/isAdmin', this.HttpOptions);
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
}
