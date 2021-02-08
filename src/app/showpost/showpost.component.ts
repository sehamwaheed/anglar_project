import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-showpost',
  templateUrl: './showpost.component.html',
  styleUrls: ['./showpost.component.css']
})
export class ShowpostComponent implements OnInit {
   post;
  constructor(private postService:PostsService , private router: Router,private rw:ActivatedRoute) { }

  ngOnInit(): void {
    this.rw.params.subscribe(

      (d)=>{this.postService.getPostById(d['id']).subscribe(
                res=>{this.post=res}

      )
      }
    )
  }

//   getPost(id){
//     this.postService.getPostById(id).subscribe(
//       data=>{console.log(data);

//       })
//   }
 }
