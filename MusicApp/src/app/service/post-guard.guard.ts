import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PostGuardGuard implements CanActivate {
  constructor(private loginservice:UserService,private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.loginservice.getLoginStatus())
    {
      console.log("from post guard",this.loginservice.getLoginStatus())
      this.router.navigate(['home']);
      return false;
    }
    console.log("from post guard else",this.loginservice.getLoginStatus())
    return true;
  }
  
}
