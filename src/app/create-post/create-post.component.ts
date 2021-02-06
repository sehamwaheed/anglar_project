import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../services/posts.service';
import {MatChipInputEvent} from '@angular/material/chips';
import { Router } from '@angular/router';

// export interface Tages {
//   name: string;
// }
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],

})
export class CreatePostComponent implements OnInit {

  postForm : FormGroup;
  imagePreview: string;
  constructor(
    private postService: PostsService,
    private router: Router

  ) { }
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tages = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;


    // Add our fruit
    if ((value || '').trim()) {
      this.tages.push(value.trim());
    }

  this.postForm.get('tags').setValue(this.tages)
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag): void {
    const index = this.tages.indexOf(tag);

    if (index >= 0) {
      this.tages.splice(index, 1);
    }
    this.postForm.get('tags').setValue(this.tages)
  }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      imagePath: new FormControl(null, [Validators.required]),
      tags: new FormControl([], [Validators.required]),


    });

  }
  onImagePicked(event : Event){
    const file = (event.target as HTMLInputElement).files[0]; // convert to html input and catch the file
    this.postForm.patchValue({'imagePath':file}) // call the single property of form [image] and assined to file
    this.postForm.get('imagePath').updateValueAndValidity() // when change image value will be updated
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = (reader.result as string); // url
    }
    reader.readAsDataURL(file); // preview url


  }
  onSubmit(){
   let data = this.postForm.value;
   console.log(data);

    this.postService.createPost(data).subscribe(data =>{
      console.log(data);
      this.router.navigate(['/Home'])
    })
  }
}
