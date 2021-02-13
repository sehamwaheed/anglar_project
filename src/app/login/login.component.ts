import { RegisterationService } from './../services/registeration.service';
import { User } from '../_model/User';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private RegisterationService:RegisterationService,private router:Router ) {
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
  this.submitted = true;
  // stop here if form is invalid
      if (this.LoginForm.invalid) return;

      this.newUser=this.LoginForm.value;
      this.submitted = true;
      // stop here if form is invalid
      if (this.LoginForm.invalid) {
          return;
      }
      //True if all the fields are filled
    if(this.submitted)
    {
      if(localStorage.getItem('token')!=null){
        localStorage.removeItem('token');
      }
      this.RegisterationService.login(this.newUser.email , this.newUser.password)
      .subscribe( result => {
          localStorage.setItem('token',result.token);
          localStorage.setItem('uid',result['_id']);
          this.router.navigate(['Home']);
          this.RegisterationService.isAuthenticated = true;
          this.RegisterationService.loggedIn.next(true)
        },
          error => this.error = 'Could not authenticate'
        );
    }
 }

  ngOnInit(): void {
  }

}
