import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from '../Model/user';
import { RouterService } from '../service/router.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginform: FormGroup;
  password: FormControl;
  email:FormControl;
  msg:string;
  uname:string;
  loggedUser:string;
  constructor(private userserviceobj:UserService,private routeService: RouterService ) { }
  ngOnInit(): void
  {
    this.password =  new FormControl('', [Validators.required]),
      this.email = new FormControl('', [Validators.required]),
      this.loginform = new FormGroup
      ({
        email:this.email,
        password: this.password,
      });
  }
  loginSubmit(){
    var email = (<HTMLInputElement>document.getElementById('email')).value;
        var password = (<HTMLInputElement>document.getElementById('password')).value;
        // console.log(email);
        // console.log(password);
        let u=new User();
        u.email=email;
        u.password=password;
    this.userserviceobj.authenticUser(u).subscribe
    (
      data=>
      {
          // console.log("loginsuccessful");
          this.msg="login successful";
          this.routeService.routeToDashboard();
          this.uname=data['email'];
          sessionStorage.setItem('loggedUser', this.uname);
         
          // console.log(this.idd);
      },error=>
      {
        // console.error();
        // console.log("invalid user id & password");
        this.msg="invalid user id & password";
      }
    );
  }
}
