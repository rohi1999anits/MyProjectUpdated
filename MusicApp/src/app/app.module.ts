import { Footer1Component } from './footer1/footer1.component';
import { YoutubeService } from './service/youtube.service';
import { SpringDataServiceService } from './service/spring-data-service.service';
import { DataStoreTransferService } from './service/data-store-transfer.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';

// music

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HinditrackComponent } from './hinditrack/hinditrack.component';
import { EnglishtrackComponent } from './englishtrack/englishtrack.component';
import { TrackComponent } from './track/track.component';
import { TrackService } from './service/track.service';

import { AudioService } from './service/audio-service.service';
import { ContactusComponent } from './contactus/contactus.component';
import { SearchComponent } from './search/search.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { IndiaComponent } from './india/india.component';
import { GermanyComponent } from './germany/germany.component';
import { ChinaComponent } from './china/china.component';
import { BrazilComponent } from './brazil/brazil.component';
import { SpainComponent } from './spain/spain.component';
import { ResultsComponent } from './results/results.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MusicService } from './service/music.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterService } from './service/router.service';
import { UserService } from './service/user.service';
import { FooterComponent } from './footer/footer.component';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { HeaderComponent } from './header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LogoutComponent } from './logout/logout.component';
import { GuardGuard } from './service/guard.guard';
import { PostGuardGuard } from './service/post-guard.guard';
import { MyInterceptorServiceService } from './service/my-interceptor-service.service';
import { UserHomeComponent } from './user-home/user-home.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ProfileComponent } from './profile/profile.component';
import {MaterialModule} from './material.module';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserHomeComponent,
    SignUpComponent,
    LogInComponent,
    HinditrackComponent,
    EnglishtrackComponent,
    TrackComponent,
    ContactusComponent,
    CommentComponent,
    SearchComponent,
    FavouriteComponent,
    RecommendationComponent,
    IndiaComponent,
    GermanyComponent,
    ChinaComponent,
    BrazilComponent,
    SpainComponent,
    ResultsComponent,
    DashboardComponent,
    FooterComponent,
    Dashboard1Component,
    HeaderComponent,
    LogoutComponent,
    ProfileComponent,
    Footer1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatDatepickerModule,
    HttpClientModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonToggleModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatExpansionModule,
    NgxPaginationModule,
    FlexLayoutModule,
    MatTooltipModule,
    NgbModule,
    NgxSpinnerModule
  ],
  providers: [TrackService, AudioService, MusicService, RouterService, UserService, GuardGuard, PostGuardGuard,
    DataStoreTransferService,SpringDataServiceService,YoutubeService
   // { provide: HTTP_INTERCEPTORS, useClass: MyInterceptorServiceService, multi: true }
   //put that above intercepter in comment otherwise it will not allow google api url to get data
   //intercepter is used to block a particular url
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
