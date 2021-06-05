import { Component, Input, OnInit, OnChanges, SimpleChange, Output } from '@angular/core';
import { MusicService } from '../service/music.service';
import { Album } from '../Model/album';
import { Tracks } from '../Model/tracks';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { Favourite } from '../Model/favourite';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnChanges {

  @Input() message: string; //getting from search.component.ts --comonent Interaction
  @Input() searchtype: string;
  isalbum: boolean = false;
  isTrack: boolean = false;
  isvideo: boolean = false;
  p: any;
  cname: string = "fa fa-heart-o";
  isRecom:boolean=false;
  myrecomlist:Favourite[] = [];

  albumlist: Array<Album> = [];
  tracklist: Array<Tracks> = [];

  a: Album;

  albumRecs: Album[];

  status: string;

  loggedIn: boolean;

  constructor(
    private musicservice: MusicService, private httpClient: HttpClient

  ) {

  }

  ngOnChanges(): void {
    if (this.message !== undefined && this.message !== "") {

      if (this.searchtype === "artist") {
        this.isTrack = false;
        this.isalbum = true;
        this.isvideo=false;
        this.albumlist = this.musicservice.getAlbumByArtist(this.message);
      } else if (this.searchtype === "album") {
        this.isTrack = false;
        this.isalbum = true;
        this.isvideo=false;
        this.albumlist = this.musicservice.getAlbumByAlbumName(this.message);

      }
      else if(this.searchtype === "video"){
        this.isTrack = false;
        this.isalbum = true;
        this.isvideo=true;
        this.albumlist = this.musicservice.getVideos(this.message);
      }

    }
  }

  ngOnInit() {
    this.musicservice.getStatus().subscribe(value => {
      this.status = value;
    });

 this.getNotes().subscribe(
    data => {
      console.log("inside recom user");
      console.log(data);
      this.myrecomlist=data;
      console.log(this.myrecomlist);
//       for(j=0;j<data.length;i++){
//       for(i=0;i<this.tracklist.length;i++){
//        if(this.tracklist[i].trackName==data[j].trackName){
//          this.tracklist[i].recommend=data[j].recommend;
//        }
//     }
//       }
},
      error =>{
        console.log("Inside error of all recommendation");
      }
  );

  }


getNotes(): Observable<any> {
    console.log(`${sessionStorage.getItem('loggedUser')}`);
    return this.httpClient.get(`http://localhost:8004/recommend/getrecommendSong/${sessionStorage.getItem('email')}`);
  }


  showtracks(album: Album) {
    this.a = album;

    this.tracklist = this.musicservice.getTracksByArtistAndAlbum(album.albumName, album.artist);
    this.isalbum = false;
    this.isTrack = true;
	this.tracklist.forEach(ele=>{
        console.log("hi+hello");
        this.myrecomlist.forEach(ele1=>{
          if(ele.trackName===ele1.songname)
               ele.recommend=ele1.recommend;
        }
          )
      })
      console.log(this.tracklist);
    
  }

  goback() {
    this.status = 'complete';
    this.a = null

    this.isTrack = false;
    this.isalbum = true;
  }





  favToggleFunction(num: any, note) {
    // console.log("func is called & num is "+ note);
    var elem = document.getElementById(String(num));
    // console.log("element is  "+elem["classList"].value);
    // console.log("type is  "+ elem["classList"].value);
    if (elem["classList"].value === "fa fa-heart-o") {
      elem["classList"].value = "fa fa-heart";
      let objfev = {
        // username:this._interactionService.getMessage(),
        username: sessionStorage.getItem('loggedUser'),
        songname: note.trackName,
        artist: note.artist,
        url: note.url,
      }
      // console.log(note);
      // console.log(objfev);
      this.httpClient.post('http://localhost:8005/favourite/saveSong', objfev).toPromise().then((data: any) => {
        console.log(data);
      });
    }
    else {
      elem["classList"].value = "fa fa-heart-o";
      let objfev = {
        username: sessionStorage.getItem('loggedUser'),
        songname: note.trackName,
        artist: note.artist,
        url: note.url,
      }
      // console.log(note);
      // console.log(objfev);
      this.httpClient.post('http://localhost:8005/favourite/removeSong', objfev).toPromise().then((data: any) => {
        console.log(data);
      });
      location.reload()
    }
  }




  recommend(num:number,note) { //we are posting data to backend and fetching again from backend and displaying in recommendation component
   
    // if(obj.checked ){
    //   console.log(obj.checked);
    //   console.log("inside recommend")
     //  this.matSlideToggle.focus();
    // this.isRecom=!this.isRecom;
    this.tracklist[num].recommend=! this.tracklist[num].recommend;
    this.musicservice.tracksupdate[num]=this.tracklist[num].recommend;
    let objfev = {
     // username: `${sessionStorage.getItem('loggedUser')}`,
      artistSongName: note.trackName,
      artist_name: note.artist,
      url: note.url,
	  recommendationCount:1,
	  image:note.image,
	  albumSingle:note.album
    }
    
    // console.log(note);
    // console.log(objfev);
    this.httpClient.post('http://localhost:8004/recommend/addRecom', objfev).toPromise().then((data: any) => {
      console.log(data);
    });
    let objfev1={
      username: `${sessionStorage.getItem('loggedUser')}`,
      songname:note.trackName,
      artist:note.artist,
      url:note.url,
      recommend:true
    }
    this.httpClient.post('http://localhost:8004/recommend/recommendSong', objfev1).toPromise().then((data: any) => {
      console.log(data);
    });
  // else{
  //   if(!obj.checked && this.isRecom){
  //     this.httpClient.delete('http://localhost:8004/recommend/delete/'+note.trackName).subscribe(
  //       data=>{
  //         console.log(data);
  //       }
  //     )
  //   }

  }
  unrecommend(num:number,note){
    this.tracklist[num].recommend=! this.tracklist[num].recommend;
    this.musicservice.tracksupdate[num]=this.tracklist[num].recommend;
    this.isRecom=true;
    this.httpClient.delete('http://localhost:8004/recommend/delete/'+note.trackName).subscribe(
      data=>{
        console.log(data);
      }
    )
  }

  albumChecker(album: Album) {
    for (let a of this.albumRecs) {
      if (album.albumName === a.albumName && album.artist === a.artist && album.imgUrl === a.imgUrl) {
        return a.id;
      }
    }
    return 0;
  }
}