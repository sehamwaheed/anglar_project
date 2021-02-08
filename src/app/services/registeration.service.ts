import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../_model/User';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterationService {

  public loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }
  constructor(private http:HttpClient,private router: Router) { }
  addUser(user:User):Observable<any>{
    return this.http.post<User>("http://localhost:8080/user",user);
  }
  getAll():Observable<any>{
    return this.http.get<User>("http://localhost:8080/user");
  }
  login(_email: string, password: string){
    return this.http.post<{token:string}>('http://localhost:8080/user/login', {email: _email, password: password})
  }
  logout(){
    localStorage.removeItem('token');
    // this.flag=false;
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
