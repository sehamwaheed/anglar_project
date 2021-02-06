import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';


import * as moment from 'moment'
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts = [];
  constructor(
    private postService: PostsService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.postService.getallPosts()
    .pipe(
      map(data =>  data.sort((a, b) => new Date(a.creatAt).getTime() - new Date().getTime()))
    )
    .subscribe(data => {

      this.posts = data

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
    this.postService.singlePost = post;
    this.router.navigate(['/Update'])
  }
}
