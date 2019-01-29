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
import { MoveComponent } from './components/move/move.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { PlayersFormComponent } from './components/players-form/players-form.component';
import { MatchRepo } from './repositories/match/match.repo';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ResultsComponent } from './pages/results/results.component';
import { MatchFormComponent } from './components/match-form/match-form.component';


library.add(fas);

@NgModule({
	declarations: [
		AppComponent,
		RuleComponent,
		MatchComponent,
		MoveComponent,
		PlayerInfoComponent,
		PlayersFormComponent,
		ResultsComponent,
		MatchFormComponent
	],
	imports: [
		BrowserModule,
		FontAwesomeModule,
		FormsModule,
		AppRoutingModule,
		NgxQRCodeModule
	],
	providers: [
		PlayerRepo,
		FeathersService,
		RuleRepo,
		MatchRepo],
	bootstrap: [AppComponent]
})
export class AppModule { }
