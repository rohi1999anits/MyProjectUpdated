import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MusicApp';
  display:string;
  displayTimeout;
  close(){
    clearTimeout(this.displayTimeout);
    this.display = null;
  }
  displayMessage(message: string, seconds: number) {
    if (this.display !== null) {
      clearTimeout(this.displayTimeout);
    } 
    this.display = message;
    this.displayTimeout = setTimeout(()=>{
      this.close();
    }, seconds * 1000);
  }
}
