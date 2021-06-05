import { Component, OnInit } from '@angular/core';
import { TrackService } from '../service/track.service';
import { Track } from '../Model/track';
import { AudioService } from '../service/audio-service.service';
import { StreamState } from '../Model/straemstate';


@Component({
  selector: 'app-englishtrack',
  templateUrl: './englishtrack.component.html',
  styleUrls: ['./englishtrack.component.css']
})
export class EnglishtrackComponent implements OnInit {
  state: StreamState;
  currentFile: any = {};
  listEngSongs: Track[]=[];
  englist: Track[]=[];
  constructor(private audioService: AudioService,private service:TrackService) { }

  ngOnInit(): void {
    this.getEnglishPlayList();
    this.getState();
  }

  getState()
  {
    this.audioService.getState()
    .subscribe(state => {
      this.state = state;
    });
  }
  getEnglishPlayList()
  {
    this.service.getEnglishPlayList().subscribe(
      (list:any)=>{
        this.listEngSongs=list.tracks;
        this.englist=this.listEngSongs.map((ele:any)=>{
          let obj={
          name:ele.name,
          artistName:ele.artistName,
          url:ele.previewURL
          }
          return obj;
        });
        console.log(this.englist);
      }
    )
  }

  playStream(url){
    this.audioService.playStream(url)
    .subscribe(events => {
      //console.log("this is from playstream",events);
    });
  }

  openFile(file, index) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.url);
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.englist[index];
    this.openFile(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.englist[index];
    this.openFile(file, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.englist.length - 1;
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }


}
