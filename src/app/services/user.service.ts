import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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
  private readonly api = 'https://blogs-1.herokuapp.com/'
  constructor(private http: HttpClient) { }

  //get profile
  getUserProfile() {
    return this.http.get(this.api + 'user/profile', this.getHeadders());
  }

  //get user by name
  getUserByuserName(userName) {
    return this.http.get(this.api + 'user/userName/' + userName, this.getHeadders());
  }

  //get all users
  getAllUsers() {
    return this.http.get(this.api + 'user', this.getHeadders());
  }

  //get my followers
  getMyFollowers() {
    return this.http.get(this.api + 'user/follower', this.getHeadders());
  }

  //Headers
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
  follow(id: any) {
    return this.http.get(this.api + 'user/followe/' + id, this.getHeadders());
  }

  //unfollow
  unfollow(id: any) {
    return this.http.patch(this.api + 'user/unfollow/' + id, null,this.getHeadders());
  }


  //update user
updateProfile(id: string, fname: string, lname: string, email:string, username:string) {

  let data ={
    _id : id,
FirstName:fname,
LastName:lname,
email:email,
userName:username
  }
  console.log(`update`,data );
  return this.http.patch(this.api + 'user/'+id, data ,this.getHeadders())

}

//delete user
deleteProfile(id){
  return this.http.delete(this.api+'user/'+id ,this.getHeadders());
 }


}
