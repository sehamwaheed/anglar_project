import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { Post, User, UserService } from '../services/user.service';
import * as moment from 'moment';



@Component({
  selector: 'app-person-profile',
  templateUrl: './person-profile.component.html',
  styleUrls: ['./person-profile.component.css']
})

export class PersonProfileComponent implements OnInit {
  arrColor = ['#28c886', 'red', 'blue', '#333', '#1df'];
  isFollowing: boolean;
  userDetails: User;
  posts = [];
  allusers: User[] = [];
  myposts: Post[] = [];
  followers: User[] = [];
  myfollowing: User[] = [];
  followernumber: number;

  
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
    this.route.paramMap
      .subscribe(params => {
        let PersonuserName = params.get('userName');
        this.userservice.getUserByuserName(PersonuserName).subscribe(
          (res: any) => {
            this.userDetails = res;
            console.log(this.userDetails);
          });
      }),



      //get all users
      this.userservice.getAllUsers().subscribe(
        (res:any)=>{
          var followerId= this.userDetails?.following;
          console.log(res);
          let follower=res?.filter(e=>{return followerId.includes(e._id);});
          console.log(follower);
          this.followers=follower;


          var currentprofile= this.userDetails;
          console.log(currentprofile);
          let following =res?.filter(e=>{return e.following.includes(currentprofile._id);});
          console.log(following);
          this.myfollowing=following;

          
        },err=>{
          console.log(err);
        }
      ),

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


  chooseRandom() {
    return this.arrColor[Math.floor(Math.random() * 5)];
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
        console.log(res);

      }, err => {
        console.log(err);
      })
  }
  //unfollow
  unfollow(userId) {
    console.log("iam sara");
    this.userservice.unfollow(userId).subscribe(
      (res: any) => {
        console.log(userId);
        console.log(res);
      }, err => {
        console.log(err);
      })
  }
  flag:boolean=this.postService.flag;
  fun(){
    this.flag=this.postService.fun(this.flag)
  }
}

