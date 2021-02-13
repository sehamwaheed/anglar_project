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

  isFollowing:boolean=false;
  userDetails: User;
  allposts: Post[] = [];
  myposts: Post[] = [];
followers:User[]=[];

  constructor(private route: ActivatedRoute,
     private userservice: UserService,
     private router:Router ,
      private postService: PostsService) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        let PersonuserName = params.get('userName');
        this.userservice.getUserByuserName(PersonuserName).subscribe(
          (res: any) => {
            this.userDetails = res;
            console.log(res);
            this.userservice.getMyFollowers().subscribe(
              (res:any)=>{
                console.log(res);

              })
          });
      }),
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
      )
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

  follow(userId){
    this.userservice.follow(userId).subscribe(
      (res:any)=>{
        console.log(userId);
          console.log(res);
      }
    )
  }
  /*onLike(postId){
    this.postService.likes(postId).subscribe(
      (data:any) => {
        console.log(`data`, data);
        let post = this.posts.find(p => p._id === postId)
        console.log(post);
        post.likes = data.likes
      })
  }*/
}

