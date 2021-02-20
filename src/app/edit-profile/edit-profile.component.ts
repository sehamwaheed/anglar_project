import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
userDetails:User;
  constructor
  (private route:ActivatedRoute,
    private userservices:UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap
    .subscribe(params => {
      let userName = params.get('userName');
      this.userservices.getUserByuserName(userName).subscribe(
        (res: any) => {
          this.userDetails = res;
          console.log(this.userDetails);
        });
    })

  }
  
deleteUser(_id){
  this.userservices.deleteProfile(_id).subscribe(
    (res:any)=>{
      console.log(res);
      this.router.navigate(['/Home'])
    }
  )
}
}
