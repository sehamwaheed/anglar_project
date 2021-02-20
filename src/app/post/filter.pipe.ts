import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../services/user.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: Post[], searchText: string): Post[] {


    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    console.log(items.filter(post=>post?.tags.includes(searchText)));
    return items.filter(post => {
      return post.titel.toLocaleLowerCase().includes(searchText) || 
      post.author.userName.toLocaleLowerCase().includes(searchText) ||
      post.tags.includes(searchText);   
    });


  }
}