import { User } from '../_model/User';
import { RegisterationService } from '../services/registeration.service';
import { Component, OnInit, Output } from '@angular/core';
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
  minDate="1960-01-01" ;
  maxDate="2004-01-01";

  constructor(private RegisterationService:RegisterationService,private router:Router ) { }
  registerForm: FormGroup = new FormGroup({
    FirstName: new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(15),Validators.pattern(this.namePattern)]),
    LastName: new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(15),Validators.pattern(this.namePattern)]),
    userName : new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(15),Validators.pattern(this.usernamePattern)]),
    email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(this.emailPattern)]),
    password : new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(20),Validators.pattern(this.pwdPattern)]),
    dob : new FormControl('', [Validators.required]),
    avatar: new FormControl(''),
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
           this.newUser=this.registerForm.value;
           this.RegisterationService.addUser(this.newUser).subscribe(data =>{
             //console.log(data);
             if(this.imageURL){
              localStorage.setItem('UserImage',this.imageURL);
             }else{
              this.imageURL="../../assets/img/logo.png";
              localStorage.setItem('UserImage',this.imageURL);
             }
            
             this.router.navigate(['login']);
            
           });
         
           //this.registerForm.reset();
           //console.log(this.newUser);
    }

  }
  imageURL: string;
 selectedFile:File;
 onPhotoSelect(event:any) {
    this.selectedFile =<File> event.target.files[0];
  

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(this.selectedFile )
  }

  ngOnInit(): void {
  }

}
