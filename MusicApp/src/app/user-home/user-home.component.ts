import { Component, OnInit } from '@angular/core';

import { TrackService } from '../service/track.service';
import { Trending } from '../Model/trending';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  p:any;
  listHindiSongs: Trending[]=[];
  hindilist: Trending[]=[];
  audio:any;
  constructor(private service:TrackService) { }

  ngOnInit(): void {
    this.getTrending();
  }

  getTrending()
  {
    this.service.getTrending().subscribe(
      (list:any)=>{
        this.listHindiSongs=list.tracks.track;
        this.hindilist=this.listHindiSongs.map((ele:any)=>{
          let obj={
           
          albumName:ele.name,
           artist:ele.artist.name,
           
           url:ele.url,
          }
          return obj;
        });
        console.log(this.hindilist);
      }
    )
  }

  // GetStation(audio)
  // {
  //     this.audio.src = audio.src;
  //     this.audio.load();
  //     this.audio.play();
  // }
}
