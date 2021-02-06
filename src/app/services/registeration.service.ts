import { Observable } from 'rxjs';
import { User } from '../_model/User';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RegisterationService {
  
  constructor(private http:HttpClient) { }
  addUser(user:User):Observable<any>{
    return this.http.post<User>("http://localhost:8080/user",user);
  }
  getAll():Observable<any>{
    return this.http.get<User>("http://localhost:8080/user");
  }
}
