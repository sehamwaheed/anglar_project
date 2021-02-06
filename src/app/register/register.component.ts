import { User } from './../_model/user';
import { RegisterationService } from '../services/registeration.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  namePattern = "^[a-zA-Z_-]{3,15}$";
  usernamePattern = "^[a-zA-Z_]{3,12}[0-9]{1,3}$";
  pwdPattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,20}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,7}.com$";
  datePaterrn ="^(0[1-9]|1[012])-(0[1-9]|[12][0-9]|[3][01])-\\d{4}$";
  constructor(private RegisterationService:RegisterationService,private router:Router ) { }
  registerForm: FormGroup = new FormGroup({
    FirstName: new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(15),Validators.pattern(this.namePattern)]),
    LastName: new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(15),Validators.pattern(this.namePattern)]),
    userName : new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(15),Validators.pattern(this.usernamePattern)]),
    email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(this.emailPattern)]),
    password : new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(20),Validators.pattern(this.pwdPattern)]),
    dob : new FormControl('', [Validators.required]),
   
  });
  submitted = false;
  newUser: User =new User ( '','','','','');
  //Add user form actions
  get f() { return this.registerForm.controls; }
  submit() {
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
    
            //alert("You are registered");
           // this.registerForm.value(null);

           this.newUser=this.registerForm.value;
           this.RegisterationService.addUser(this.newUser).subscribe(data =>{
             console.log(data);
             this.router.navigate(['login'])
           });
           //this.registerForm.reset();
           
           //console.log(this.newUser);
    }
   
  }
  ngOnInit(): void {
  }

}
