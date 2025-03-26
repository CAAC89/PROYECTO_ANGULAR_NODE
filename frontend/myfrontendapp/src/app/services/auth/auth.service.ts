import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/users';
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private http: HttpClient) {}

  // Login
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  // Guardar token en localStorage
  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  saveEmail(email: string): void {
    localStorage.setItem('email', email);
  }

  // Obtener token
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getEmail(): string | null {
    return localStorage.getItem('email');
  }

  // Eliminar token (logout)
  logout(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('auth_token');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1])); // Decodificar token
    const expiration = payload.exp * 1000;
    return Date.now() < expiration;
  }
}
