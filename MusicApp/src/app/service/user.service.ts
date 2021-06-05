import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../Model/user';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

export class User1{
  constructor(public status:string,){}
}
export class JwtResponse{
  constructor(public jwttoken:string,){}
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentLoginStatus:BehaviorSubject<boolean>;
  profileImg:BehaviorSubject<any>;
  profileImgSub():Observable<any>{
    return this.profileImg.asObservable();
  }

  constructor(private httpClient: HttpClient) {
    this.profileImg = new BehaviorSubject<any>(sessionStorage.getItem('profileImage'));//we are getting from local storage
    if (!sessionStorage.getItem("token")) {
      this.currentLoginStatus = new BehaviorSubject<boolean>(false);
    } else {
      this.currentLoginStatus = new BehaviorSubject<boolean>(true);
    }
   }
  // authenticUser(user:User)  {
  //   return this.httpClient.post<User>("http://localhost:8088/users/login",user);
  // }
  //this is for register
  addUser(formdata:FormData)  {
    return this.httpClient.post<User>("http://localhost:8002/users/register",formdata);
  }
  
  public get getCurrentLoginStatus(): boolean {
    return this.currentLoginStatus.value;
  }
//this is while login authenticating
  authenticUser(user:User)  {
    return this.httpClient.post("http://localhost:8002/users/login",user).pipe(
      map(
        userData=>{
          sessionStorage.setItem('email', user.email);
          let tokenStr='Bearer '+userData["token"];
          sessionStorage.setItem('token',tokenStr);
          sessionStorage.setItem('userid',userData["id"]);
          this.getprofileimage().subscribe(data =>{
            this.profileImg.next('data:image/png;base64,'+data["profileImage"]);
            sessionStorage.setItem('profileImage','data:image/png;base64,'+data["profileImage"]);
          })
          return userData;
        }
      )
    );
  }
  logout()
  {
    sessionStorage.removeItem('email');
   // sessionStorage.removeItem('securityStr');
  }
  getLoginStatus()
  {
    if(sessionStorage.getItem('email')!=null)
    {
      return true;
    }
    return false;
  }
  //added things
  getprofileimage():Observable<User>{
    let params = new HttpParams().append('user_id',sessionStorage.getItem("userid"))
                  .append('Authorization','Bearer '+sessionStorage.getItem("token"));
   return this.httpClient.get<User>("http://localhost:8002/users/getuserimage", {params});
  }

  deleteprofile():Observable<any>{
    let params = new HttpParams().append('user_id',sessionStorage.getItem("userid"))
                  .append('Authorization','Bearer '+sessionStorage.getItem("token"));
    return this.httpClient.delete("http://localhost:8002/users/deleteuser",{params});
  }

  upadateprofileimage(formdata:FormData){
    let params = new HttpParams().append('user_id',sessionStorage.getItem("userid"))
                  .append('Authorization','Bearer '+sessionStorage.getItem("token"));  
    return this.httpClient.put('http://localhost:8002/users/changeprofilepicture', formdata,{params}).pipe(map(() =>{
      this.getprofileimage().subscribe(data=>{
        this.profileImg.next('data:image/png;base64,'+data["profileImage"]);
        localStorage.setItem('profileImage','data:image/png;base64,'+data["profileImage"]);
        return data;
      });
    })
    );
  }

  changepassword(formdata:FormData){
    let params = new HttpParams()
                  .append('Authorization','Bearer '+sessionStorage.getItem("token"))
                  .append('user_id',sessionStorage.getItem("userid"));
                console.log(sessionStorage.getItem('userid'))  ;
    return this.httpClient.put('http://localhost:8002/users/changepassword',formdata,{params}); 
  }

}