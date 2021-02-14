import { PostsService } from './../services/posts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  flag:boolean=this.postservice.flag;

  constructor(public postservice:PostsService) { }

  ngOnInit(): void {
    
  }
  
  fun(){
    this.flag=this.postservice.fun(this.flag)
  }
  
}
