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
    return this.http.post<{token:string}>('https://blogs-1.herokuapp.com/login', {email: _email, password: password})
  }
  logout(){
    localStorage.removeItem('token');
    // this.flag=false;
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
