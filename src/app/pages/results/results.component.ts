import { Component } from "@angular/core";
import { MatchRepo } from 'src/app/repositories/match/match.repo';
import { PlayerRepo } from 'src/app/repositories/player/player.repo';
import { Observable } from 'rxjs';
import { IPlayer } from 'src/app/repositories/player/player.model';
import { map } from 'rxjs/operators';

@Component({
	selector: 'results-page',
	templateUrl: './results.component.html',
	styleUrls: ['results.component.css']
})
export class ResultsComponent {
	matches: Observable<any[]>;
	players: Observable<IPlayer[]>;

	constructor(
		matchRepo: MatchRepo,
		private playerRepo: PlayerRepo
	) {
		this.matches = matchRepo.getAllMatches().pipe(map(matchRes => {
			return matchRes
				.filter(m => m.winner)
				.map(m => new Object({
					_id: m._id,
					winner: m.player1Id === m.winner ? m.player1 : m.player2,
					looser: m.player1Id === m.winner ? m.player2 : m.player1
				}));
		}));
		this.players = this.playerRepo.getAllPlayers();
	}
}
