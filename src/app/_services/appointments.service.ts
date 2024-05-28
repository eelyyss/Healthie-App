import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/appointments/';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  constructor(private http: HttpClient) {}

  createAppointment(data: any): Observable<any> {
    return this.http.post(API_URL, data);
  }

  getAppointment(id: string): Observable<any> {
    return this.http.get(`${API_URL}${id}`);
  }

  updateAppointment(id: string, data: any): Observable<any> {
    return this.http.put(`${API_URL}${id}`, data);
  }

  deleteAppointment(id: string): Observable<any> {
    return this.http.delete(`${API_URL}${id}`);
  }

  getAllAppointments(): Observable<any> {
    return this.http.get(API_URL);
  }
}
