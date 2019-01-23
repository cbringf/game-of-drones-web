import { Component } from "@angular/core";
import { FeathersService } from '../../feathers.service';
import { PlayerRepo } from '../../player.repo';
import { IPlayer } from '../../player.model';
import { PlayService } from '../../play.service';
import { playerFactory } from '../../player.factory';
import { RuleRepo } from '../../rule.repo';
import { Observable } from 'rxjs';
import { IMove } from 'src/app/move.model';

@Component({
	selector: 'play-page',
	templateUrl: './play.component.html',
	styleUrls: ['./play.component.css']
})
export class PlayComponent {
	player1: IPlayer;
	player2: IPlayer;
	readyToStart: boolean = false;
	moves: Observable<string[]>;
	currentPlayer: IPlayer;

	constructor(
		private feathers: FeathersService,
		private playerRepo: PlayerRepo,
		private playService: PlayService,
		private ruleRepo: RuleRepo) {
		this.player1 = playerFactory();
		this.player2 = playerFactory();
		this.moves = ruleRepo.getMoves();
	}

	async startPlay() {
		this.player1 = await this.playerRepo.findOrCreate(this.player1.name, this.feathers)
			.toPromise();
		this.player2 = await this.playerRepo.findOrCreate(this.player2.name, this.feathers)
			.toPromise();
		this.ruleRepo.getAllRules().subscribe(rules => {
			this.playService.startPlay(this.player1, this.player2, rules,
				(winner) => this.onPlayFinished(winner));
		});
		this.currentPlayer = this.player1;
	}

	private onPlayFinished(winner: IPlayer) {
		console.log(winner);
		winner.record++;
		this.playerRepo.updatePlayer(winner);
		this.reset();
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
}
