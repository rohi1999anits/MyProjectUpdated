import { RouterService } from './../service/router.service';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Favourite } from '../Model/favourite';
import { DataStoreTransferService } from '../service/data-store-transfer.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
   p:any;
   
  favList:Favourite[]=[];
  cname:string="fa fa-heart";
  
   //uname=this._interactionService.getMessage();
  getNotes(): Observable<any>  {
    return this.httpClient.get(`http://localhost:8005/favourite/getSong/${sessionStorage.getItem('loggedUser')}`);
  }
  constructor(private httpClient: HttpClient,private dataStore: DataStoreTransferService,private rout: RouterService) { 
    
  }

  // delete(note)
  //   {
  //     let objfev={
  //       username:this._interactionService.getMessage(),
  //       songname:note.trackName,
  //       artist:note.artist,
  //       url:note.url,
  //     }
  //     console.log(note);
  //     console.log(objfev);
  //     this.httpClient.post('http://localhost:8001/favourite/removeSong',objfev).toPromise().then((data:any)=>{
  //   console.log(data);
  // });
  
  //   }
  delete(num:any,note)
    {
      var elem = document.getElementById(String(num));
      if(elem["classList"].value==="fa fa-heart"){
        elem["classList"].value="fa fa-heart-o";
      let objfev={
        //username:this._interactionService.getMessage(),
        username:sessionStorage.getItem('loggedUser'),
        songname:note.trackName,
        artist:note.artist,
        url:note.url,
      }
      console.log(note);
      
      console.log(objfev);
      this.httpClient.post('http://localhost:8005/favourite/removeSong',objfev).toPromise().then((data:any)=>{
    console.log(data);
  });}
  location.reload()
    }
  ngOnInit() {
    this.getNotes().subscribe(
      res=>
      {
        this.favList=res;
        
    }

    )

    console.log("my final loggedin email is "+sessionStorage.getItem('loggedUser'));
    

   

    }
    Onclick(album){//it is the each time of the fav list array
      console.log(album['songname']);
      var value:string;
      value = album['songname'];
      console.log(typeof(value));
      this.dataStore.tostoreComment(value);//songName
      this.rout.goToComment();
    }
}
