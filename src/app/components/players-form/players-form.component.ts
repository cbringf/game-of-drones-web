import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlayerRepo } from 'src/app/repositories/player/player.repo';
import { MatchRepo } from 'src/app/repositories/match/match.repo';
import { IMatch } from 'src/app/repositories/match/match.model';
import { IPlayer } from 'src/app/repositories/player/player.model';
import { playerFactory } from 'src/app/tools/factories/player.factory';
import { IPlayersFormResponse } from 'src/app/repositories/_models/players-form-response.model';

@Component({
	selector: 'players-form',
	templateUrl: './players-form.component.html',
	styleUrls: ['./players-form.component.css']
})
export class PlayersFormComponent implements OnInit {
	match: IMatch;
	player1: IPlayer;
	player2: IPlayer;
	@Output() onPlayersReady: EventEmitter<IPlayersFormResponse>

	constructor(
		private playerRepo: PlayerRepo,
		private matchRepo: MatchRepo
	) {
		this.player1 = playerFactory();
		this.player2 = playerFactory();
		this.onPlayersReady = new EventEmitter();
	}

	ngOnInit() {
		this.matchRepo.createMatch().subscribe(m => this.match = m);
	}

	async startPlay() {
		this.player1 = await this.playerRepo.findOrCreate(this.player1.name)
			.toPromise();
		this.player2 = await this.playerRepo.findOrCreate(this.player2.name)
			.toPromise();
		this.onPlayersReady.emit({
			player1: this.player1,
			player2: this.player2
		});
	}
}
