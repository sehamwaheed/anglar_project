import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { CreatePostIdComponent } from './create-post-id/create-post-id.component';
import { ShowpostComponent } from './showpost/showpost.component';


import { LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';

//profile
import{ProfileComponent} from'./profile/profile.component';
import { SearchComponent } from './search/search.component';
import { PersonProfileComponent } from './person-profile/person-profile.component';


const routes: Routes = [
  {path:'Home',component:HomeComponent  },
  {path:'Create',component:CreatePostComponent},
  {path:'Update/:id',component:CreatePostIdComponent},

  {path:'Show/:id',component:ShowpostComponent},

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
   
  { path: 'Home/PersonProfile/:userName', component: PersonProfileComponent },
  { path: 'Home/profile', component: ProfileComponent },
  
  { path: 'Home/search', component: SearchComponent },

 
  

  { path: '',   redirectTo: '/Home', pathMatch: 'full' } // redirect to `first-component`

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
