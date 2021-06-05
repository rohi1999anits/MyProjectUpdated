import { Component, OnInit } from '@angular/core';
import { Track } from '../Model/track';
import { TrackService } from '../service/track.service';

@Component({
  selector: 'app-china',
  templateUrl: './china.component.html',
  styleUrls: ['./china.component.css']
})
export class ChinaComponent implements OnInit {
  p:any;
  listHindiSongs: Track[]=[];
  hindilist: Track[]=[];
  constructor(private service:TrackService) { }

  ngOnInit(): void {
    this.getChina();
  }
  getChina()
  {
    this.service.getChina().subscribe(
      (list:any)=>{
        this.listHindiSongs=list.results.trackmatches.track;
        this.hindilist=this.listHindiSongs.map((ele:any)=>{
          let obj={
          name:ele.name,
          artistName:ele.artist.name,
          url:ele.url
          }
          return obj;
        });
        console.log(this.hindilist);
      }
    )
  }
}
