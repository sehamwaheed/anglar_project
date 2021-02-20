import { AuthGuard } from './gards/auth.guard';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { CreatePostIdComponent } from './create-post-id/create-post-id.component';
import { ShowpostComponent } from './showpost/showpost.component';


import { LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PersonProfileComponent } from './person-profile/person-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  {path:'Home',component:HomeComponent  },
  {path:'Create',component:CreatePostComponent, canActivate:[AuthGuard]},
  {path:'Update/:id',component:CreatePostIdComponent, canActivate:[AuthGuard]},

  {path:'Show/:id',component:ShowpostComponent, canActivate:[AuthGuard]},

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  //----------profile----------
  { path: 'Home/PersonProfile/:userName', component: PersonProfileComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'edit/:userName', component:EditProfileComponent },
  //---------------------------

  { path: '',   redirectTo: '/Home', pathMatch: 'full' } // redirect to `first-component`

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
