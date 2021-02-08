import { RegisterationService } from './../services/registeration.service';
import { Component, OnInit,Input } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  constructor(private RegisterationService:RegisterationService) {}
  logout() {
     this.RegisterationService.logout();
  }
  ngOnInit(): void {
    this.isLoggedIn$ = this.RegisterationService.isLoggedIn;
  }

}
