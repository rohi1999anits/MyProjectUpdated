import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.css']
})
export class Dashboard1Component implements OnInit {
  image:any;
  constructor(private service:UserService) { 
    this.service.profileImgSub().subscribe(data => {
    this.image = data;
    console.log(this.image);
  },error =>{this.image="../../assets/images/apple.jpg";
            });
 }

  ngOnInit(): void {
  }

}
