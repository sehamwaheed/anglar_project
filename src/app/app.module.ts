import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostComponent } from './post/post.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule, MAT_CHIPS_DEFAULT_OPTIONS} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { CreatePostIdComponent } from './create-post-id/create-post-id.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



const matMaterial = [
  MatInputModule,
  MatChipsModule,
  MatIconModule
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PostComponent,
    HomeComponent,
    CreatePostComponent,
    CreatePostIdComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ...matMaterial
  ],
  providers: [
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA]
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
