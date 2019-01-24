import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { PlayerRepo } from './repositories/player/player.repo';
import { FormsModule } from '@angular/forms'
import { RuleRepo } from './repositories/rule/rule.repo';
import { AppRoutingModule } from './app-routing.module';
import { RuleComponent } from './pages/rules/rule.component';
import { MatchComponent } from './pages/match/match.component';
import { FeathersService } from './services/feathers.service';
import { PlayService } from './services/play.service';


library.add(fas);

@NgModule({
	declarations: [
		AppComponent,
		RuleComponent,
		MatchComponent
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
