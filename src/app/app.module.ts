import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayerRepo } from './player.repo';
import { FeathersService } from './feathers.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [PlayerRepo, FeathersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
