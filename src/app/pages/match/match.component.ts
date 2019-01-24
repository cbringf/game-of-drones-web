import { Component } from "@angular/core";
import { PlayerRepo } from '../../repositories/player/player.repo';
import { IPlayer } from '../../repositories/player/player.model';
import { playerFactory } from '../../tools/factories/player.factory';
import { RuleRepo } from '../../repositories/rule/rule.repo';
import { Observable } from 'rxjs';
import { IPlayersFormResponse } from '../../repositories/_models/players-form-response.model';
import { PlayService } from '../../services/play.service';

@Component({
	selector: 'match-page',
	templateUrl: './match.component.html',
	styleUrls: ['./match.component.css']
})
export class MatchComponent {
	player1: IPlayer;
	player2: IPlayer;
	readyToStart: boolean = false;
	moves: Observable<string[]>;
	currentPlayer: IPlayer;
	onPlay: boolean;
	playFinished: boolean;
	winner: IPlayer;

	constructor(
		private playerRepo: PlayerRepo,
		private playService: PlayService,
		private ruleRepo: RuleRepo) {
		this.player1 = playerFactory();
		this.player2 = playerFactory();
		this.moves = ruleRepo.getMoves();
		this.onPlay = false;
	}

	async startPlay() {
		this.player1 = await this.playerRepo.findOrCreate(this.player1.name)
			.toPromise();
		this.player2 = await this.playerRepo.findOrCreate(this.player2.name)
			.toPromise();
		this.ruleRepo.getAllRules().subscribe(rules => {
			this.playService.startPlay(this.player1, this.player2, rules,
				(winner) => this.onPlayFinished(winner));
			this.onPlay = true;
		});
		this.currentPlayer = this.player1;
	}

	setPlayers(players: IPlayersFormResponse) {

	}

	private onPlayFinished(winner: IPlayer) {
		this.winner = winner;
		this.winner.record++;
		this.playerRepo.updatePlayer(winner);
		this.playFinished = true;
		//this.reset();
	}

	reset() {
		this.player1 = playerFactory();
		this.player2 = playerFactory();
		this.currentPlayer = null;
	}

	selectMove(move: string) {
		this.currentPlayer['move'] = move;
	}

	play() {
		if (this.currentPlayer._id === this.player2._id) {
			this.playService.addMove(this.player1['move'], this.player2['move']);
			this.currentPlayer = this.player1;
		}
		else {
			this.currentPlayer = this.player2;
		}
	}

	playAgain() {
		this.restorePlayers();
		this.currentPlayer = this.player1;
		this.playFinished = false;
	}

	restorePlayers() {
		this.player1.move = '';
		this.player1.hits = 0;
		this.player2.move = '';
		this.player2.hits = 0;
	}

	exit() {
		this.reset();
		this.onPlay = false;
		this.playFinished = false;
	}
}
