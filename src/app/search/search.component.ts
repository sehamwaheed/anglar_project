import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post, PostsService } from '../services/posts.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  posts:Post[];
  resDiv:boolean=false;
  constructor( private postService: PostsService, private router: Router, private UserService:UserService) { }

  
  ngOnInit(): void {

  }
  searchPosts(title:string){
this.postService.fetchPostsbytitle(title).subscribe(
  (res:any)=>{
  this.posts=res;
  console.log(res);
  this.resDiv=true;
});

  }
}
