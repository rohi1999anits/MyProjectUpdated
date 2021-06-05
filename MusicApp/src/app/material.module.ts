import { MatExpansionModule } from '@angular/material/expansion';
// src/app/material.module.ts for material ui
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import {    MatSlideToggleModule} from '@angular/material/slide-toggle';


const modules = [
    MatButtonModule,
    MatListModule,
    MatSliderModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatSlideToggleModule

];

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule {}