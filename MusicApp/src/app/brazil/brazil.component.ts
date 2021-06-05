import { Component, OnInit } from '@angular/core';
import { TrackService } from '../service/track.service';
import { Track } from '../Model/track';

@Component({
  selector: 'app-brazil',
  templateUrl: './brazil.component.html',
  styleUrls: ['./brazil.component.css']
})
export class BrazilComponent implements OnInit {
   p:any;
  listHindiSongs: Track[]=[];
  hindilist: Track[]=[];
  constructor(private service:TrackService) { }

  ngOnInit(): void {
    this.getBrazil();
  }

  getBrazil()
  {
    this.service.getBrazil().subscribe(
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
