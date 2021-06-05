import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private http: HttpClient) { }

  getHindiPlayList(): Observable<any>
  {
    return this.http.get("http://ws.audioscrobbler.com/2.0/?method=track.search&track=Atif+Aslam&api_key=f6461f6889c8f2b1a0994c70929277fc&format=json");
  }

  getEnglishPlayList(): Observable<any>
  {
    return this.http.get("https://api.napster.com/v2.1/tracks/top?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm");
  }

  getIndia(): Observable<any>
  {
    return this.http.get("http://ws.audioscrobbler.com/2.0/?method=track.search&track=Atif+Aslam&api_key=f6461f6889c8f2b1a0994c70929277fc&format=json");
  }

  getSpain(): Observable<any>
  {
    return this.http.get("http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=spain&api_key=f6461f6889c8f2b1a0994c70929277fc&format=json");
  }

  getKorea(): Observable<any>
  {
    return this.http.get("http://ws.audioscrobbler.com/2.0/?method=track.search&track=Kim%20Taehyung&api_key=f6461f6889c8f2b1a0994c70929277fc&format=json");
  }

  getBrazil(): Observable<any>
  {
    return this.http.get("http://ws.audioscrobbler.com/2.0/?method=track.search&track=Elis%20Regina&api_key=f6461f6889c8f2b1a0994c70929277fc&format=json");
  }

  getChina(): Observable<any>
  {
    return this.http.get("http://ws.audioscrobbler.com/2.0/?method=track.search&track=Jacky%20Cheung&api_key=f6461f6889c8f2b1a0994c70929277fc&format=json");
  }

  getTrending(): Observable<any>
  {
    return this.http.get("http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=497cdc0b3cfc31c0dc9dfbd1938c1959&format=json");
  }
}
