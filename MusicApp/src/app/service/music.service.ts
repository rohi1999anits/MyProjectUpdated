import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Album } from '../Model/album';
import { Tracks } from '../Model/tracks';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { YoutubeService } from './youtube.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MusicService {
  YOUR_API_KEY:string = "497cdc0b3cfc31c0dc9dfbd1938c1959";
  apiKey : string = 'AIzaSyBdWf2b9cp95VPWbmvBnA-hrR0Tv8RLH4M';
  searchStatus:BehaviorSubject<string>;
  videos: any[];
  tracksupdate :Array<boolean> = [];
  private unsubscribe$: Subject<any> = new Subject();
  getStatus(): Observable<string> {
    return this.searchStatus.asObservable();
  }

  setStatus(newValue:string):void{
    this.searchStatus.next(newValue);
  }

  constructor(private HttpClient:HttpClient,private spinner: NgxSpinnerService, private youTubeService: YoutubeService) { 
    this.searchStatus = new BehaviorSubject<string>('hold');
  }

  getAlbumByArtist(artistName:string){
    this.setStatus('searching');
    
    let albumlist: Array<Album> =[];
    this.HttpClient.get(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artistName}&api_key=${this.YOUR_API_KEY}&format=json`)
      .subscribe(
      data => {
        if (data.hasOwnProperty("error")) {
          this.setStatus('none');
        }else {
          for(let albm of data["topalbums"]["album"]){
            let album = new Album();
            album.albumName=albm["name"];
            album.artist=albm["artist"]["name"];
            if (albm["image"][2]["#text"] === "") {
              album.imgUrl = '../assets/album.png';
            } else {
              album.imgUrl=albm["image"][3]["#text"];
            }
            album.url=albm["artist"]["url"];
            if(albm["name"]!=="(null)"){
              albumlist.push(album);
            }
          }
        }
      }, error => {
        this.setStatus('none');
      }, () => {
        if (albumlist.length == 0) {
          this.setStatus('none');
        } else {
          this.setStatus('complete');
        }
      }
    );
    return albumlist;
  }


  getAlbumByAlbumName(albumName:string){
    this.setStatus('searching');
    let albumlist: Array<Album> =[];
    this.HttpClient.get(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${albumName}&api_key=${this.YOUR_API_KEY}&format=json`).subscribe(
      data => {
        if (data.hasOwnProperty("error")) {
          this.setStatus('none');
        } else {
          for(let albm of data["results"]["albummatches"]["album"]){
            let album = new Album();
            album.albumName=albm["name"];
            album.artist=albm["artist"];
            album.url=albm["url"];
            if (albm["image"][2]["#text"] === "") {
              album.imgUrl = '../assets/album.png';
            } else {
              album.imgUrl=albm["image"][3]["#text"];
            }
            if(albm["name"]!=="(null)"){
              albumlist.push(album);
            }
          }
        }
      }, error => {
        this.setStatus('none');
      }, () => {
        if (albumlist.length == 0) {
          this.setStatus('none');
        } else {
          this.setStatus('complete');
        }
      }
    );
    return albumlist;
  }

  getTracksByArtistAndAlbum(albumName:string, artist:string){
    this.setStatus('searching');
    let tracklist:Array<Tracks>=[];
    this.HttpClient.get(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${this.YOUR_API_KEY}&artist=${artist}&album=${albumName}&format=json`).subscribe(
      data=>{
        if (data.hasOwnProperty("error")) {
          this.setStatus('none');
        } else {
          for(let track of data["album"]["tracks"]["track"]){
            let tracks = new Tracks();
            tracks.album = data["album"]["name"];
            tracks.artist = data["album"]["artist"];
            tracks.image = data["album"]["image"][2]["#text"];
            tracks.trackName = track["name"];
           // tracks.url = data["album"]["url"];
           tracks.url = track["url"];
           tracks.recommend=this.tracksupdate[data["album"]["tracks"]["track"].indexOf(track)];
            tracklist.push(tracks);
          }
        }
      }, error => {
        this.setStatus('none');
      }, () => {
        if (tracklist.length == 0) {
          this.setStatus('none');
        } else {
          this.setStatus('complete');
        }
      }
    );
    return tracklist;
  }
  getVideos(q){
    this.setStatus('searching');
    
    let albumlist: Array<Album> =[];
    this.youTubeService.getVideosForChanel(q).pipe(takeUntil(this.unsubscribe$)).subscribe(
      lista => {
        for (let element of lista["items"]) {
          albumlist.push(element)
        }
        console.log(this.videos);
       },error => {
        this.setStatus('none');
      }, () => {
        if (albumlist.length == 0) {
          this.setStatus('none');
        } else {
          this.setStatus('complete');
        }
      }
       );
      return albumlist;
  }

    
  


  // One method pulling by track name
  // Other pulling by album name
}