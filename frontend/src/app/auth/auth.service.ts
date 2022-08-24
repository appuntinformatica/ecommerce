import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { AppState } from '../store/app.state';
import { autoLogout } from '../auth/state/auth.actions';

import { User } from './user.model';

interface AuthResponseData {
  token: string;
  username: string;
  expiration: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeoutInterval: any;
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(username: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${environment.serverUrl}/api/auth/login`, { username, password });
  }

  recoveryPassword(email: string): Observable<string> {
    return this.http.post<string>(
      `${environment.serverUrl}/api/auth/account/resetPassword?email=${email}`, 
      { email },
      { responseType: 'text' as 'json' }
    );
  }

  formatUser(data: AuthResponseData) {
    console.log('AuthService.fromUser data: ', data);
    /*
    const expirationDate = new Date(
      new Date().getTime() + +Date.parse(data.expiration) * 1000
    );
*/
    const expirationDate = new Date( +Date.parse(data.expiration) );

    const user = new User(
      data.username,
      data.token,
      "",
      expirationDate
    );
    return user;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
        return 'Email already exists';
      default:
        return 'Unknown error occurred. Please try again';
    }
  }

  setUserInLocalStorage(user: User) {
    console.log('AuthService.setUserInLocalStorage() user: ', user);
    localStorage.setItem('userData', JSON.stringify(user));

    this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate;

    console.log('AuthService.runTimeoutInterval() timeInterval: ', timeInterval);

    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(autoLogout());
      //logout functionality or get the refresh token
    }, timeInterval);
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(
        userData.username,
        userData.token,
        userData.localId,
        expirationDate
      );
      this.runTimeoutInterval(user);
      return user;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('userData');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }
}

