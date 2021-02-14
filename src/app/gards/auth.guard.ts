import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterationService } from '../services/registeration.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 constructor(
  private registerService: RegisterationService,
  private router : Router
 ) {

 }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAuth = this.registerService.getIsAuth();
    console.log(isAuth);
    if (!isAuth) {
      this.router.navigate(['/login']);
    }
      return isAuth;
  }

}
