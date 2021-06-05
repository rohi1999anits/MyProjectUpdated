import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { HomeComponent } from './home/home.component';

import { TrackComponent } from './track/track.component';
import { HinditrackComponent } from './hinditrack/hinditrack.component';
import { EnglishtrackComponent } from './englishtrack/englishtrack.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SearchComponent } from './search/search.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
//import { CountrieswiseComponent } from './countrieswise/countrieswise.component';
import { IndiaComponent } from './india/india.component';
import { GermanyComponent } from './germany/germany.component';
import { ChinaComponent } from './china/china.component';
import { BrazilComponent } from './brazil/brazil.component';
import { SpainComponent } from './spain/spain.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {Dashboard1Component}  from './dashboard1/dashboard1.component';
import { HeaderComponent } from './header/header.component';
import { LogoutComponent } from './logout/logout.component';
import { GuardGuard } from './service/guard.guard';
import { PostGuardGuard } from './service/post-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { CommentComponent } from './comment/comment.component';
import { FooterComponent } from './footer/footer.component';




const routes: Routes = [
   {
     path:'',component:HomeComponent
   },
  {path :'signup',
   component:SignUpComponent,canActivate:[PostGuardGuard]
},
{
  path:'login',
  component:LogInComponent,canActivate:[PostGuardGuard]
},
{path:'logout', component:LogoutComponent},

  {path:'tracks', component:TrackComponent},
  {path:'hindi', component:HinditrackComponent},
  {path:'english', component:EnglishtrackComponent},
  {path:'contactus', component:ContactusComponent},
  {path:'search', component:SearchComponent},
  {path:'favourite', component:FavouriteComponent},
  {path:'recommendation', component:RecommendationComponent},
  {path:'comment',component:CommentComponent},
 // {path:'contrieswise', component:CountrieswiseComponent},
  {path:'profile',component:ProfileComponent},
  {path:'tracks', component:TrackComponent},
  {path:'india', component:IndiaComponent},
  {path:'china', component:ChinaComponent},
  {path:'germany', component:GermanyComponent},
  {path:'brazil', component:BrazilComponent},
  {path:'spain', component:SpainComponent},
  {path: 'search', component: SearchComponent},
  {path:'dashboard',component: DashboardComponent,canActivate:[GuardGuard]},
  {path:'dashboard1', component:Dashboard1Component},
  {path:'header', component:HeaderComponent},
  {path:'footer', component:FooterComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
