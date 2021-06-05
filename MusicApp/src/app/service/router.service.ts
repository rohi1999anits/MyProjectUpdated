import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RouterService {
  constructor(private router: Router) { }
  routeToDashboard() {
    this.router.navigate(['dashboard']);
  }
  routeToProfile() {
    this.router.navigate(['profile']);
  }
  goToComment(){
    this.router.navigate(['comment']);
  }
}
