import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../services/user.service';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(items: User[], searchText: string): User[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return [];
    }
    searchText = searchText.toLocaleLowerCase();
    return items.filter(user => {
      return user.FirstName.toLocaleLowerCase().includes(searchText) || 
      user.userName.toLocaleLowerCase().includes(searchText) ;  
    });


  }

}
