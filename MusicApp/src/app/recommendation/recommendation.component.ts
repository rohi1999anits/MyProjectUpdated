import { Component, OnInit } from '@angular/core';
import { Favourite } from '../Model/favourite';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PasswordMatch, PasswordDifferent } from '../_helpers/password-match.validator';
import { AppComponent } from '../app.component';
import { UserService } from '../service/user.service';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  favList: Favourite[] = [];
  arrayCount: Array<any>=[];
  p: any;
  cname: string = "fa fa-heart";
  tempArray: Array<any> = [];
  //@Input() uname:string;
  constructor(private httpClient: HttpClient) { }
  ngOnInit() {
    this.getNotes().subscribe(data=>{
      this.arrayCount = data;
      this.arrayCount.forEach(element => {
        this.tempArray.push(element.artistSongName);
      });//ths recommendationCount is present in backend Recommendationns model class
       this.arrayCount.sort((a, b) => (a.recommendationCount < b.recommendationCount) ? 1 : -1);

    },
    error =>{
      console.log("Inside error of all recommendation");
    }
  );
  }

  getNotes(): Observable<any> {
    return this.httpClient.get(`http://localhost:8004/recommend/getAllRecom`);
  }

  // delete(num: any, note) {
  //   var elem = document.getElementById(String(num));
  //   if (elem["classList"].value === "fa fa-heart") {
  //     elem["classList"].value = "fa fa-heart-o";
  //     let objfev = {
  //       //username:this._interactionService.getMessage(),
  //       username: sessionStorage.getItem('loggedUser'),
  //       songname: note.trackName,
  //       artist: note.artist,
  //       url: note.url,
  //     }
  //     console.log(note);

  //     console.log(objfev);
  //     this.httpClient.post('http://localhost:8004/recommend/removeSong', objfev).toPromise().then((data: any) => {
  //       console.log(data);
  //     });
  //   }
  //   this.ngOnInit();
  //   // location.reload()
  // }




}