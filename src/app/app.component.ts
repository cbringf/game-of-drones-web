import { Component } from '@angular/core';
import { FeathersService } from './feathers.service';
import { PlayerRepo } from './player.repo';
import { IPlayer } from './player.model';
import { PlayService } from './play.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	player1: IPlayer;
	player2: IPlayer;
	readyToStart: boolean = false;
	constructor(
		private feathers: FeathersService,
		private playerRepo: PlayerRepo,
		private playService: PlayService) {
	}

	async startPlay() {
		this.player1 = await this.playerRepo.findOrCreate(this.player1.name, this.feathers)
		.toPromise();
		this.player2 = await this.playerRepo.findOrCreate(this.player2.name, this.feathers)
			.toPromise();
		this.playService.startPlay(this.player1, this.player2, this.onPlayFinished)
	}

	private onPlayFinished(winner: IPlayer) {
		winner.record++;
		this.playerRepo.updatePlayer(winner);
	}

	reset() {
		this.player1 = null;
		this.player2 = null;
	}
}
