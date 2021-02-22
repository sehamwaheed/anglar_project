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

  chooseRandom(name) {
    // return this.arrColor[Math.floor(Math.random() * 5)];
    let color;
    var key = name?.toLowerCase().charAt(0);
    switch(key)  {
      case 'a':  { color = '#374045'; break;}
      case 'b':  { color = '#222831'; break;}
      case 'c':  { color = '#ff4646'; break;}
      case 'd':  { color = '#272343'; break;}
      case 'e':  { color = '#008891'; break;}
      case 'f':  { color = '#fdb827'; break;}
      case 'g':  { color = '#351f39'; break;}
      case 'h':  { color = '#54e346'; break;}
      case 'i':  { color = '#204051'; break;}
      case 'j':  { color = '#007965'; break;}
      case 'k':  { color = '#3d4199'; break;}
      case 'l':  { color = '#5d54a4'; break;}
      case 'm':  { color = '#897402'; break;}
      case 'n':  { color = '#153e90'; break;}
      case 'o':  { color = '#fecd1a'; break;}
      case 'p':  { color = '#790c5a'; break;}
      case 'q':  { color = '#01c5c4'; break;}
      case 'r':  { color = '#5d54a4'; break;}
      case 's':  { color = '#822659'; break;}
      case 't':  { color = '#4d375d'; break;}
      case 'u':  { color = '#16c79a'; break;}
      case 'v':  { color = '#c70039'; break;}
      case 'w':  { color = '#ca431d'; break;}
      case 'x':  { color = '#ff5722'; break;}
      case 'y':  { color = '#cdb30c'; break;}
      case 'z':  { color = '#d2e603'; break;}
    };

    return color;
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
