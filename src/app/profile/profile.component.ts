import { Component, OnInit } from '@angular/core';
import{Post, User, UserService}from './../services/user.service';
import { Router } from '@angular/router';
import { PostsService } from '../services/posts.service';
import * as moment from 'moment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {
userDetails:User;
allusers:User[]=[];
allposts:Post[]=[];
myposts:Post[]=[];
followers:number;
followerDetails:User[]=[];


constructor(private UserService:UserService,private router:Router ,private postService: PostsService) { }

  click(){}


  ngOnInit(): void {
    this.UserService.getUserProfile().subscribe(
      (res:any)=>{
        this.userDetails = res;
        this.followers=res.following.length;
        
        console.log(res);
      
      }
    ),
    this.UserService.getAllUsers().subscribe(
      (res:any)=>{
        this.allusers=res;
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    ),
    this.postService.getallPosts().subscribe(
      (res:any)=>{
        this.allposts=res;
        console.log(res);
        this.myposts=this.allposts.filter((e1)=>{return e1.author._id==this.userDetails._id;});
        console.log(this.myposts);
        
      },
      err=>{
        console.log(err);
      }
    );
    

    
  }






  onLike(postId){
    this.postService.likes(postId).subscribe(
      (data:any) => {
        console.log(`data`, data);
        let post = this.myposts.find(p => p._id === postId)
        console.log(post);
        post.likes = data.likes
      })
  }
  getTimeFromNow(date) {
    return moment(date).fromNow()
  }

  delete(id){
    this.postService.deletePost(id).subscribe(
      ()=>{
        console.log('complete');
       let pindex = this.myposts.findIndex(d =>d._id == id)
       console.log(pindex)
       this.myposts.splice(pindex,1)
       console.log( this.myposts)

      }
    )
  }
  goToUpate(post){

    this.router.navigate(['/Update',post._id])
  }

  createComent(id,coment){
    console.log(`coment`, coment);
    let content={content:coment}
    this.postService.creatComent(id,content).subscribe(
     (d:any)=>{
      console.log(`d`, d);
      let pindex = this.myposts.find(p =>p._id == id);
      console.log(`d`, pindex);
      pindex.comments = d.comments
     }
    )
  }
}
