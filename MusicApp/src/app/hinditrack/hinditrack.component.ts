import { Component, OnInit } from '@angular/core';
import { Track } from '../Model/track';
import { TrackService } from '../service/track.service';

@Component({
  selector: 'app-hinditrack',
  templateUrl: './hinditrack.component.html',
  styleUrls: ['./hinditrack.component.css']
})
export class HinditrackComponent implements OnInit {
  listHindiSongs: Track[]=[];
  hindilist: Track[]=[];
  constructor(private service:TrackService) { }

  ngOnInit(): void {
    this.getHindiPlayList();
  }


  getHindiPlayList()
  {
    this.service.getHindiPlayList().subscribe(
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
