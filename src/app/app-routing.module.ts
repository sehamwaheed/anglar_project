import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { CreatePostIdComponent } from './create-post-id/create-post-id.component';

const routes: Routes = [
  {path:'Home',component:HomeComponent},
  {path:'Create',component:CreatePostComponent},
  {path:'Update',component:CreatePostIdComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
