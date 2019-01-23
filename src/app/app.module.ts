import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayerRepo } from './player.repo';
import { FeathersService } from './feathers.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { PlayService } from './play.service';
import { RuleRepo } from './rule.repo';
import { AppRoutingModule } from './app-routing.module';
import { RulePage } from './pages/rules/rule.page';
import { PlayComponent } from './pages/play/play.component';

@NgModule({
  declarations: [
    AppComponent,
    RulePage,
    PlayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
      PlayerRepo,
      FeathersService,
      PlayService,
      RuleRepo],
  bootstrap: [AppComponent]
})
export class AppModule { }
