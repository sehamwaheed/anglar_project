import { Component, OnInit } from '@angular/core';
import { Post, PostsService } from '../services/posts.service';


import * as moment from 'moment'
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


import{User, UserService}from './../services/user.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  loader = true;
  posts = [];
  userDetails:User;
  searchText:string;
  items:Post[];


  constructor(
    private postService: PostsService,
    private router: Router,
    private UserService:UserService
  ) { }

  ngOnInit(): void {
    this.postService.getallPosts()
    .pipe(
      map(data =>  data.sort((a, b) => new Date(a.creatAt).getTime() - new Date().getTime()))
    )
    .subscribe(data => {
      this.loader =false;
      this.posts = data

    }),
    this.UserService.getUserProfile().subscribe(
      (res:any)=>{
        this.userDetails = res;
        console.log(res);
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
        let post = this.posts.find(p => p._id === postId)
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
       let pindex = this.posts.findIndex(d =>d._id == id)
       console.log(pindex)
       this.posts.splice(pindex,1)
       console.log( this.posts)

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
      let pindex = this.posts.find(p =>p._id == id);
      console.log(`d`, pindex);
      pindex.comments = d.comments
     }
    )
  }
}
