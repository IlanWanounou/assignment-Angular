import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  constructor(private http: HttpClient,  private snackBar: MatSnackBar, private router: Router ) {}

  private url = environment.apiUrl + '/user';
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

  logOut() {
    this.clearToken();
    this.snackBar.open("Déconnexion réussie !", 'OK', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    this.router.navigate(['/home']);
    this.isLoggedIn = false;
  }

  // Les autres méthodes sont commentées pour l'instant
}
