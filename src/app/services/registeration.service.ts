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
  error:boolean=false;
  public loggedIn = new BehaviorSubject<boolean>(false); // {1}
  isAuthenticated: boolean =false;

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }
  constructor(private http:HttpClient,private router: Router) { }
  addUser(user:User):Observable<any>{
    return this.http.post<User>("https://blogs-1.herokuapp.com/user",user);
  }
  getAll():Observable<any>{
    return this.http.get<User>("https://blogs-1.herokuapp.com/user");
  }
  login(_email: string, password: string){
    return this.http.post<{token:string}>('https://blogs-1.herokuapp.com/user/login', {email: _email, password: password})
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    // this.flag=false;
    this.loggedIn.next(false);
    this.isAuthenticated =false;
    this.router.navigate(['/login']);
  }
  getIsAuth(){
    return this.isAuthenticated;
  }
getToken(){
  return localStorage.getItem('token');
}
autoDetactUser(){
  const userToken = this.getToken();
  if (userToken) {
    this.isAuthenticated = true;
    this.loggedIn.next(true);
  }
}
}
