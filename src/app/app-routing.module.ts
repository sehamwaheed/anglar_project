import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { CreatePostIdComponent } from './create-post-id/create-post-id.component';
import { LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
const routes: Routes = [
  {path:'Home',component:HomeComponent},
  {path:'Create',component:CreatePostComponent},
  {path:'Update',component:CreatePostIdComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '',   redirectTo: '/Home', pathMatch: 'full' }, // redirect to `first-component`
  {path:'Create',component:CreatePostComponent},
  {path:'Update',component:CreatePostIdComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
