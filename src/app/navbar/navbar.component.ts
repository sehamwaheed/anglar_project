import { RegisterationService } from './../services/registeration.service';
import { Component, OnInit,Input } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  login
  isLoggedIn$: Observable<boolean>;
  constructor(private RegisterationService:RegisterationService) {}
  logout() {
     this.RegisterationService.logout();
  }
  imageURlLogin :String =localStorage.getItem('UserImage');
  ngOnInit(): void {
    this.isLoggedIn$ = this.RegisterationService.isLoggedIn;
    this.isLoggedIn$.subscribe(d=>{this.login = d;console.log(`this.login`, this.login);})
  }

}
