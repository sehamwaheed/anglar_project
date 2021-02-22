import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostsService } from '../services/posts.service';


import * as moment from 'moment'
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RegisterationService } from '../services/registeration.service';
import { Post, User, UserService } from '../services/user.service';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  loader = true;
  arrColor = ['#28c886', 'red', 'blue', '#333', '#1df'];
  enableEdit=true;

  posts = [];
  isAuth: boolean;

  @Input('commentId') commentId!: string;
  @Output('change') change = new EventEmitter();
  //--variables------------
  searchText: string;
  items: Post[];
  allusers: User[];
  loginUser:User;
  //-----------------------

  constructor(
    private postService: PostsService,
    public registerService: RegisterationService,
    private router: Router,

    //user services----------
    private UserService: UserService
    //-----------------------

  ) { }

  chang(post) {
    let userId = localStorage.getItem("uid") || '';

    if (post.likes.includes(userId)) {
      return true;
    }
    else {
      return false;
    }
  }


  ngOnInit(): void {

//---------------get all users-----------------
this.UserService.getAllUsers().subscribe(
  (res:any)=>{
    this.allusers=res;
    console.log(res);
  },
  err=>{
    console.log(err);
  }
)

 //get login profile
 this.UserService.getUserProfile().subscribe(
  (res:any)=>{
    this.loginUser=res;
  },err=>{
    console.log(err);
  }
),
  //-------------------------------------------

    this.registerService.loggedIn.subscribe(res => this.isAuth = res)
    this.postService.getallPosts()
      .pipe(
        map(data => data.sort((a, b) => new Date(a.creatAt).getTime() - new Date().getTime()))
      )
      .subscribe(data => {
        this.loader = false;
        this.posts = data

      })

  }

  onLike(postId) {
    this.postService.likes(postId).subscribe(
      (data: any) => {
        console.log(`data`, data);
        let post = this.posts.find(p => p._id === postId)
        console.log(post);
        post.likes = data.likes

      })
  }


  getTimeFromNow(date) {
    return moment(date).fromNow()
  }

  delete(id) {
    this.postService.deletePost(id).subscribe(
      () => {
        console.log('complete');
        let pindex = this.posts.findIndex(d => d._id == id)
        console.log(pindex)
        this.posts.splice(pindex, 1)
        console.log(this.posts)

      }
    )
  }
  goToUpate(post) {

    this.router.navigate(['/Update', post._id])
  }

  createComent(id, coment) {
    console.log(`coment`, coment);
    let content = { content: coment }
    this.postService.creatComent(id, content).subscribe(
      (d: any) => {
        console.log(`d`, d);
        let pindex = this.posts.find(p => p._id == id);
        console.log(`d`, pindex);
        pindex.comments = d.comments
      }
    )
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

  genarteChar(name: string) {
    return name.charAt(0).toUpperCase();
  }

  deleteCommint(id, postIndex, commentIndex) {
    this.postService.delCommint(id).subscribe((data) => {
      console.log(`deleteCommint`, data);
      // this.posts[postIndex].comments = data['comments'];
      (this.posts[postIndex].comments as []).splice(commentIndex, 1)
    })
  }

  editComment(data: HTMLSpanElement) {

    const comment = { content: data.textContent };
    this.postService.editComment(this.commentId, comment).subscribe(() => {
      this.change.emit();
    });
  }

}
