import { Observable } from 'rxjs';
import { User } from '../_model/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RegisterationService {

  constructor(private http:HttpClient) { }
  addUser(user:User):Observable<any>{
    return this.http.post<User>("http://blogs-1.herokuapp.com/user",user);
  }
  getAll():Observable<any>{
    return this.http.get<User>("http://blogs-1.herokuapp.com/user");
  }
}
