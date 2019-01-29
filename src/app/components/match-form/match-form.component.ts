import { Component, Output, EventEmitter } from "@angular/core";
import { MatchRepo } from 'src/app/repositories/match/match.repo';
import { IMatch } from 'src/app/repositories/match/match.model';

@Component({
	selector: 'match-form',
	templateUrl: './match-form.component.html',
	styleUrls: ['./match-form.component.css']
})
export class MatchFormComponent {
	@Output() onMatchResolved: EventEmitter<IMatch>;

	constructor(private matchRepo: MatchRepo) {
		this.onMatchResolved = new EventEmitter();
	}

	createMatch() {
		console.log('match created');
		this.matchRepo.createMatch();
	}

	joinMatch() {}
}
