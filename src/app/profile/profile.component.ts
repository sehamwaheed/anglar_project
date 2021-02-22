import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { Post, User, UserService } from '../services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  arrColor = ['#28c886', 'red', 'blue', '#333', '#1df'];
  isFollowing: boolean;
  userDetails: User;
  posts = [];
  allusers: User[] = [];
  myposts: Post[] = [];
  followers: User[] = [];
  myfollowing: User[] = [];
  searchText:string;
  followernumber: number;
  allposts:Post[]=[];
  followerDetails:User[]=[];

  isAuth: boolean;

  constructor(private route:ActivatedRoute,
    private userservice: UserService,
    private router: Router,
    private postService: PostsService) { }


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

this.userservice.getUserProfile().subscribe(
  (res:any)=>{
    this.userDetails=res;
    this.followers=res.following.length;
  },err=>{console.log(err);}
),

    //get all users
    this.userservice.getAllUsers().subscribe(
      (res:any)=>{
        var followerId=this.userDetails?.following;
        console.log(res);
        var follower=res?.filter(e=>{return followerId?.includes(e._id);});
        this.followers=follower;
        console.log(follower);
      },err=>{
        console.log(err);

      }
    ),


    //get login user followers
    this.userservice.getMyFollowers().subscribe(
      (res: any) => {
        this.myfollowing=res;
        console.log(res);
      }),


      //get all posts
      this.postService.getallPosts().subscribe(
        (res:any)=>{
          this.posts=res;
          console.log(res);
          this.myposts=this.posts.filter((e1)=>{return e1.author?._id==this.userDetails?._id;});
          console.log(this.myposts);
        }
      );
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


  //follow
  follow(userId) {
    this.userservice.follow(userId).subscribe(
      (res: any) => {
        console.log(userId);
        console.log('res',res);
        this.userDetails.following = res.following;
      }, err => {
        console.log(err);
      })
  }
  //unfollow
  unfollow(userId) {
    this.userservice.unfollow(userId).subscribe(
      (res: any) => {
        console.log(userId);
        console.log('res',res);
        this.userDetails.following = res.following;
      }, err => {
        console.log(err);
      })
  }


}
