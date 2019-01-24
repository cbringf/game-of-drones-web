import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { PlayerRepo } from './player.repo';
import { FeathersService } from './feathers.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { PlayService } from './play.service';
import { RuleRepo } from './rule.repo';
import { AppRoutingModule } from './app-routing.module';
import { RulePage } from './pages/rules/rule.page';
import { PlayComponent } from './pages/play/play.component';


library.add(fas);

@NgModule({
  declarations: [
    AppComponent,
    RulePage,
    PlayComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
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
