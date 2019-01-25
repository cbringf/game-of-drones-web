import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RuleComponent } from './pages/rules/rule.component';
import { MatchComponent } from './pages/match/match.component';
import { ResultsComponent } from './pages/results/results.component';

const routes: Routes = [
	{ path: '', redirectTo: '/play', pathMatch: 'full' },
	{ path: 'rules', component: RuleComponent },
	{ path: 'play', component: MatchComponent },
	{ path: 'results', component: ResultsComponent }
];

@NgModule({
	declarations: [],
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
