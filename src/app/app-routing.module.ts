import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RuleComponent } from './pages/rules/rule.component';
import { MatchComponent } from './pages/match/match.component';

const routes: Routes = [
	{ path: '', redirectTo: '/play', pathMatch: 'full' },
	{ path: 'rules', component: RuleComponent },
	{ path: 'play', component: MatchComponent }
];

@NgModule({
	declarations: [],
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
