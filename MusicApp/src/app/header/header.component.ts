import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: boolean;
  image:any;
  constructor(private service: UserService) { 
   

   }
  ngOnInit(): void {
    this.isLoggedIn$=this.service.getLoginStatus();
  }
 
}