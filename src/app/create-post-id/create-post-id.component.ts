import { ENTER, COMMA, T } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-create-post-id',
  templateUrl: './create-post-id.component.html',
  styleUrls: ['./create-post-id.component.css']
})
export class CreatePostIdComponent implements OnInit {

  postForm : FormGroup;
  imagePreview: string;
  postId: string;
  constructor(
    private postService: PostsService,
    private router: Router,
    private activeRoute: ActivatedRoute

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
      _id: new FormControl('', [Validators.required]),
      titel: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      imagePath: new FormControl(null, [Validators.required]),
      tags: new FormControl([], [Validators.required]),


    });
    this.activeRoute.paramMap.subscribe(param => {
      this.postId = param.get('id');
      this.postService.getPostById(this.postId).subscribe(data =>{
        this.postService.singlePost = data;
        console.log(`this.pos`, this.postService.singlePost);
        this.postForm.patchValue(this.postService.singlePost);
    this.postForm.get('tags').patchValue(this.postService.singlePost.tags[0].split(','));


    this.tages = this.postService.singlePost.tags[0].split(',');
    this.imagePreview = this.postService.singlePost.imagePath;
      })
    })

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

    this.postService.updatePost(data._id, data.titel, data.content, data.imagePath, data.tags).subscribe(data =>{
      console.log(data);
      this.router.navigate(['/Home'])
    })
  }



}
