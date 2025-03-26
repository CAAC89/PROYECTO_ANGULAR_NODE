import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  //Use next login
  getUser(email:string, token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // Enviar el email como query param
    return this.http.get<any>(`${this.apiUrl}?email=${email}`, { headers });
  }


  getAllUser(token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // Enviar el email como query param
    return this.http.get<any>(`${this.apiUrl}`, { headers });
  }

  updateUser(userData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(`${this.apiUrl}`, userData, { headers });
  }

  deleteUser(userData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.delete<any>(`${this.apiUrl}`, { headers, body: userData });
  }

  createUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, userData);
  }

  getUserByEmail(userData: any, token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // Enviar el email 
    return this.http.post<any>(`${this.apiUrl}/getUserByEmail`, userData, { headers });
  }
}
