import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { apiUrl} from '../constant'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user): Observable<any>{
    return this.http.post(apiUrl('login'), user);
  }
  
  signUp(user): Observable<any>{
    return this.http.post(apiUrl('sign-up'), user);
  }

  logout(){
    localStorage.removeItem('token');
  }

  checkSignedIn(){
    return !!localStorage.getItem('token');
  }
}
