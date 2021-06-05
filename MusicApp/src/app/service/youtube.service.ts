import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  apiKey : string = 'AIzaSyBdWf2b9cp95VPWbmvBnA-hrR0Tv8RLH4M';

  constructor(public http: HttpClient) { }

  getVideosForChanel(q): Observable<any> {
    //let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&channelId=' + channel + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults
    //console.log("ran")
    let newurl= `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${q}&key=${this.apiKey}&type=video`;
    //console.log(newurl)
    return this.http.get(newurl);
  }
}
