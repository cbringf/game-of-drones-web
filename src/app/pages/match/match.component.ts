import { Component } from "@angular/core";
import { PlayerRepo } from '../../repositories/player/player.repo';
import { IPlayer } from '../../repositories/player/player.model';
import { playerFactory } from '../../tools/factories/player.factory';
import { RuleRepo } from '../../repositories/rule/rule.repo';
import { Observable } from 'rxjs';
import { IPlayersFormResponse } from '../../repositories/_models/players-form-response.model';
import { PlayService } from '../../services/play.service';
import { IMatch } from 'src/app/repositories/match/match.model';
import { MatchRepo } from 'src/app/repositories/match/match.repo';

@Component({
	selector: 'match-page',
	templateUrl: './match.component.html',
	styleUrls: ['./match.component.css']
})
export class MatchComponent {
	player1: IPlayer;
	player2: IPlayer;
	cursor: number = 0;
	winner: IPlayer;
	match: IMatch;

	constructor(
		private playService: PlayService,
		private ruleRepo: RuleRepo,
		private playerRepo: PlayerRepo,
		private matchRepo: MatchRepo) {
	}

	get playersReady() {
		return this.player1 && this.player2;
	}

	get currentPlayer() {
		return this.cursor > 0 ? this.player2 : this.player1;
	}

	setPlayers(players: IPlayersFormResponse) {
		this.match = players.match;
		this.ruleRepo.getAllRules().subscribe(rules => {
			this.player1 = players.player1;
			this.player2 = players.player2;
			this.playService.startPlay(this.player1, this.player2, rules,
				(winner) => this.onPlayFinished(winner));
		});
	}

	private onPlayFinished(winner: IPlayer) {
		this.winner = winner;
		this.winner.record++;
		this.match.winner = this.winner._id;
		this.playerRepo.updatePlayer(winner);
		this.matchRepo.updateMatch(this.match);
	}

	play() {
		if (this.cursor > 0) {
			this.cursor--;
			this.playService.addMove(this.player1.move, this.player2.move);
		}
		else {
			this.cursor++;
		}
	}

	playAgain() {
		this.restorePlayers();
		this.matchRepo.createMatch().subscribe(m=>{
			this.match = m;
			this.match.player1Id = this.player1._id;
			this.match.player2Id = this.player2._id;
			this.matchRepo.updateMatch(this.match);
			this.winner = null;
		});
	}

	restorePlayers() {
		this.player1.move = '';
		this.player1.hits = 0;
		this.player2.move = '';
		this.player2.hits = 0;
	}

	exit() {
		this.player1 = null;
		this.player2 = null;
		this.match = null;
		this.winner = null;
	}
}
