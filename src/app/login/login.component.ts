import { User } from './../_model/User';
import { AuthService } from '../services/auth.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private AuthService:AuthService,private router:Router ) {
  };
   error: any ;

 LoginForm: FormGroup = new FormGroup({
   email : new FormControl('', [Validators.required]),
   password : new FormControl('', [Validators.required]),

 });
 submitted = false;
 newUser: User =new User ( '','','','','');

 //Add user form actions
 get f() { return this.LoginForm.controls; }
 submit() {
 this.newUser=this.LoginForm.value;
 this.AuthService.login(this.newUser.email , this.newUser.password)
 .subscribe( (result:any) => {
     localStorage.setItem('token',result.token);
     this.router.navigate(['Home'])},
   error => this.error = 'Could not authenticate'
   );
 }

  ngOnInit(): void {
  }

}
