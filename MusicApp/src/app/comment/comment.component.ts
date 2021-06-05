import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Comment1 } from '../Model/comment1';
import { SpringDataServiceService } from '../service/spring-data-service.service';
import { DataStoreTransferService } from '../service/data-store-transfer.service';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  CommentForm: FormGroup;
  emailUser: FormControl;
  artistSongName: FormControl;
  comment: FormControl;
  temp:Array<Comment1>;
  array:Array<any>;
  comment1:Comment1;
  dataform:{};
  isExpanded: boolean=false;
  artsistnam:string;

  constructor(private formBuilder: FormBuilder,private c:SpringDataServiceService,private datastore: DataStoreTransferService) {
    
   }
  ngOnInit() {
    this.emailUser = new FormControl();
    this.artistSongName = new FormControl();
    this.comment = new FormControl();
    this.CommentForm = new FormGroup({
      artistSongName:this.artistSongName,
      comment:this.comment,
      emailUser:this.emailUser
    });
    
    this.temp=[];
    this.array=[];
    this.comment1=new Comment1();

    this.artsistnam = this.datastore.togetCommentObj();//songname from backend each item of fav list
this.GetArtistName();
  this.get();
  }
  GetArtistName(){
   
    this.dataform =
    {
      "emailUser" : sessionStorage.getItem("email"),//username i.e mail
      "artistSongName" : this.artsistnam,
      "comment" : this.CommentForm.value.comment
    }


  }
  
  submit()
  {
    this.comment1.emailUser = this.emailUser.value;
    this.comment1.artistSongName = this.artistSongName.value;
    this.comment1.comment = this.comment.value;
    console.log(this.CommentForm.value);
    console.log("Kiran");
    //console.log(this.datastore.toGetFavObject());
    this.dataform =
      {
        "emailUser" : sessionStorage.getItem("email"),//token here
        "artistSongName" : this.artsistnam,
        "comment" : this.CommentForm.value.comment
      }

  
    console.log("Inside comment post"); 
    console.log(this.dataform);
    this.save(this.dataform); //holds email,songname and actual comment
    }
  

  save(value) {
    //springDtaService obj
    this.c.saveComment(value)
      .subscribe(
        data => {
          console.log("inside data send service!");
          console.log(data);
        this.get();
      }, 
      error => console.log(error));
      
    this.CommentForm.reset();
  }
  expand(){
    console.log("Expanded!");
    console.log(this.dataform['artistSongName']);
    this.GetArtistName();
    this.get();
    this.isExpanded = !this.isExpanded;
    }
  get(){
    this.c.getComment(this.dataform['artistSongName']).subscribe(data=>
      {
        console.log(data);
        console.log('inside data display service');
        this.temp=data;//we are getting the data and storing in temp array
        console.log(this.temp);
      }
        ,error=>console.log(error));
    
    console.log("--------");
    console.log(this.temp)
  }

}



