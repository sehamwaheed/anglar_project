import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Post{
  _id,
  titel,
  content,
  imagePath,
  tags
}
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  singlePost
  private readonly api ='https://blogs-1.herokuapp.com/'
  constructor(
    private http: HttpClient
  ) {

  }

getallPosts():Observable<any>{
  return this.http.get(this.api +'blog',this.getHeadders())

}

createPost(body){
  const postData = new FormData();
  postData.append('titel', body.title);
  postData.append('content', body.content);
  postData.append('tags', body.tags);
  postData.append('image', body.imagePath, body.title);

  return this.http.post(this.api + 'blog/create', postData ,this.getHeadders())
}

updatePost(id: string, titel: string, content: string, image: File | string, tags: any) {
  // const post: Post  = { id:id, title:title, content:content ,imagePath:null};
  let postData: Post | FormData;
  if (typeof (image) === "object") {
    postData = new FormData();

    postData.append('_id', id);
    postData.append('titel', titel);
    postData.append('content', content);
    postData.append('tags', tags);
    postData.append('image', image, titel);

  } else {
    postData = { _id: id, titel: titel, content: content, imagePath: image ,tags:tags };
  }

  return this.http.patch(this.api + 'blog/'+id, postData ,this.getHeadders())

}

private getHeadders( incomingHeaders?: HttpHeaders ): { headers: HttpHeaders; } {


  return {
      headers: incomingHeaders
          ? incomingHeaders
          : new HttpHeaders({
                Authorization:
                    "Bearer " + localStorage.getItem("token"),

            }),
      // observe: "response",
  };
}

//delete post
deletePost(id){
 return this.http.delete(this.api+'blog/'+id ,this.getHeadders());
}

getPostById(id){
  return this.http.get(this.api+'blog/'+id ,this.getHeadders());
}

likes(id){
  return this.http.post(this.api+'blog/like/'+id,null,this.getHeadders());
}

creatComent(id,coment){
  return this.http.post(this.api+'comment/add/'+id,coment, this.getHeadders())
}

delCommint(id){
  return this.http.delete(this.api+'comment/delete/' +id,this.getHeadders())
}

}
