import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface User {
  _id,
   FirstName,
   LastName,
   email,
 userName,
 password,
 dob,
 following
}

export interface Post {
  _id,
  titel,
  content,
  imagePath,
  tags,
  author,
  creatAt,
  likes,
  comments
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly api ='https://blogs-1.herokuapp.com/'
  constructor(private http:HttpClient) { }

   //get profile
    getUserProfile(){
      return this.http.get(this.api + 'user/profile',this.getHeadders());
    }

    //get user by name
    getUserByuserName(userName){
      return this.http.get(this.api + 'user/userName/' + userName,this.getHeadders());
    }

    //get all users
    getAllUsers (){
      return this.http.get(this.api + 'user',this.getHeadders());
    }

    //get my followers
    getMyFollowers(){
      return this.http.get(this.api + 'user/follower',this.getHeadders());
    }

   //search 
    /*fetchPosts(id: string): Observable<Post[]> {
      return this.http.get<Post[]>(`${this.api}/posts?userId=${id}`).pipe(
        catchError(err => of([]))
      );
    }*/

    private getHeadders(incomingHeaders?: HttpHeaders): { headers: HttpHeaders; } {


      return {
        headers: incomingHeaders
          ? incomingHeaders
          : new HttpHeaders({
            Authorization:
              "Bearer " + localStorage.getItem("token"),
  
          }),
      };
    }

//follow
    follow(id) {
      return this.http.get(this.api + 'user/followe/' + id,  this.getHeadders());
    }
}
