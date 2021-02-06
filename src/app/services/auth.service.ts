import { User } from '../_model/User';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(_email: string, password: string){
    return this.http.post<{token:string}>('http://blogs-1.herokuapp.com/user/login', {email: _email, password: password})
  }

}
