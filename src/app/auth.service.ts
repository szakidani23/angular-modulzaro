import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usersDB: any[] = JSON.parse(localStorage.getItem('usersDB') || '[]');
  private apiUrl = 'https://siposm.hu/developerAPI/login';

  constructor(private http: HttpClient) {}

  apiLogin(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password }).pipe(
      catchError((error) => {
        console.log('API login failed:😒', error);
        throw error;
      })
    );
  }

  login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.apiLogin(username, password).subscribe(
        (response: any) => {
          // Api login success = user data LocalStorage save
          localStorage.setItem('loggedInUser', JSON.stringify(response.user));
          console.log('API Login success!👍');
          resolve(true);
        },
        (error) => {
          console.log('API login failed.. checking localStorage.🧐');
          // LocalStorage check if Api login failed
          const localUser = this.usersDB.find(
            (u) => u.username === username && u.password === password
          );

          if (localUser) {
            localStorage.setItem('loggedInUser', JSON.stringify(localUser));
            console.log('Login successful with LocalStorage!👍');
          } else {
            console.log('Invalid username or password!😒');
            reject('Invalid username or password!🧐');
          }
        }
      );
    });
  }

  register() {}
  logout() {}
}
