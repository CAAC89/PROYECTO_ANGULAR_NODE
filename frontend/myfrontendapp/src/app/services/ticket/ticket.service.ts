import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'http://localhost:3000/api/tickets';

  constructor(private http: HttpClient) {}

  getAllTickets(token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // Enviar el email como query param
    return this.http.get<any>(`${this.apiUrl}`, { headers });
  }

  createTicket(userData: any, token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.apiUrl}`, userData, { headers });
  }

  updateTicket(userData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(`${this.apiUrl}`, userData, { headers });
  }

  deleteTicket(userData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.delete<any>(`${this.apiUrl}`, { headers, body: userData });
  }
}
