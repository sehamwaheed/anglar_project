import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../services/posts.service';
import * as moment from 'moment'
@Component({
  selector: 'app-showpost',
  templateUrl: './showpost.component.html',
  styleUrls: ['./showpost.component.css']
})
export class ShowpostComponent implements OnInit {
   post;
   arrColor= ['#28c886','red','blue','#333','#1df'];
  constructor(private postService:PostsService , private router: Router,private rw:ActivatedRoute) { }

  ngOnInit(): void {
    this.rw.params.subscribe(

      (d)=>{this.postService.getPostById(d['id']).subscribe(
                res=>{this.post=res}

      )
      }
    )
  }


  deleteCommint(id, commentIndex){
    this.postService.delCommint(id).subscribe((data) =>{
        console.log(`deleteCommint`,data );
        // this.posts[postIndex].comments = data['comments'];
        (this.post.comments as []).splice(commentIndex,1)
    })
  }

  getTimeFromNow(date) {
    return moment(date).fromNow()
  }

  chooseRandom(){
    return this.arrColor[Math.floor(Math.random() * 5)];
  }
  genarteChar(name:string){
    return name.charAt(0).toUpperCase();
  }



//   getPost(id){
//     this.postService.getPostById(id).subscribe(
//       data=>{console.log(data);

//       })
//   }
 }
