import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userDetails:User;
  userForm : FormGroup;
  constructor
  (private route:ActivatedRoute,
    private userservices:UserService,
    private router: Router) { }

  ngOnInit(): void {

    this.userForm = new FormGroup({
      _id: new FormControl(''),
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),

    });
    this.route.paramMap
    .subscribe(params => {
      let userName = params.get('userName');
      this.userservices.getUserProfile().subscribe(
        (res: any) => {
          this.userDetails = res;
          this.userForm.patchValue(res);
          console.log(this.userDetails);
        });
    });


  }

  onSubmit(){
    let data = this.userForm.value;
    console.log(data);

     this.userservices.updateProfile(data._id, data.FirstName, data.LastName, data.Email, data.userName).subscribe(data =>{
       console.log(data);
       this.router.navigate(['/Home'])
     })

}

deleteUser(_id){
  this.userservices.deleteProfile(_id).subscribe(
    (res:any)=>{
      console.log(res);
      this.router.navigate(['/login'])
    }
  )
}
}
