import { User } from '../_model/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(_email: string, password: string){
    return this.http.post('http://blogs-1.herokuapp.com/user/login', {email: _email, password: password})
  }

}
