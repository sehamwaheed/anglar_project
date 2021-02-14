import { Component, OnInit } from '@angular/core';
import { PostsService } from './services/posts.service';
import { RegisterationService } from './services/registeration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  title = 'Blogimo';
  constructor(
    private registerService: RegisterationService,
  ) {

  }
  ngOnInit(): void {
    this.registerService.autoDetactUser()
  }
}
