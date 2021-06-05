import { Component, OnInit } from '@angular/core';
import { TrackService } from '../service/track.service';
import { Track } from '../Model/track';

@Component({
  selector: 'app-spain',
  templateUrl: './spain.component.html',
  styleUrls: ['./spain.component.css']
})
export class SpainComponent implements OnInit {
  p:any;
  listHindiSongs: Track[]=[];//track array using basic structure of card
  hindilist: Track[]=[];
  constructor(private service:TrackService) { }

  ngOnInit(): void {
    this.getSpain();//will be called when this component is loaded
  }

  getSpain()
  {//fetch spain music data from api
    this.service.getSpain().subscribe(
      (list:any)=>{
        this.listHindiSongs=list.tracks.track;//in list  object tracks key having another json with key track
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
