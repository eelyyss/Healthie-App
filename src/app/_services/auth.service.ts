import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  register(
    username: string,
    email: string,
    password: string,
    dob: string,
    gender: string,
    documentType: string,
    documentNumber: string,
    province: string,
    city: string,
    phoneNumber: string,
    terms: boolean
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
        dob,
        gender,
        documentType,
        documentNumber,
        province,
        city,
        phoneNumber,
        terms,
      },
      httpOptions
    );
  }


  getLoginSubject(): Observable<void> {
    return this.loginSubject.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      { username, password },
      httpOptions
    ).pipe(
      tap(() => this.loginSubject.next())
    );

  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }
}
