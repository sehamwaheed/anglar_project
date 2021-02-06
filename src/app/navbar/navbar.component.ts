import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  flag :Boolean=true;
  constructor() { }
  logout() {
    localStorage.removeItem('Token');
   this.flag=false;
  }
  ngOnInit(): void {
  }

}
