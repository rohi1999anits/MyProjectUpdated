import { Component, OnInit } from '@angular/core';
import { TrackService } from '../service/track.service';
import { Track } from '../Model/track';

@Component({
  selector: 'app-india',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.css']
})
export class IndiaComponent implements OnInit {
  p:any;
  listHindiSongs: Track[]=[];
  hindilist: Track[]=[];
  constructor(private service:TrackService) { }

  ngOnInit(): void {
    this.getIndia();
  }
  getIndia()
  {
    this.service.getIndia().subscribe(
      (list:any)=>{
        this.listHindiSongs=list.results.trackmatches.track;
        this.hindilist=this.listHindiSongs.map((ele:any)=>{
          let obj={
          name:ele.name,
          artistName:ele.artist,
          url:ele.url
          }
          return obj;
        });
        console.log(this.hindilist);
      }
    )
  }
}
