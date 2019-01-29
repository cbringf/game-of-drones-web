import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlayerRepo } from 'src/app/repositories/player/player.repo';
import { MatchRepo } from 'src/app/repositories/match/match.repo';
import { IMatch } from 'src/app/repositories/match/match.model';
import { IPlayer } from 'src/app/repositories/player/player.model';
import { playerFactory } from 'src/app/tools/factories/player.factory';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
	selector: 'players-form',
	templateUrl: './players-form.component.html',
	styleUrls: ['./players-form.component.css']
})
export class PlayersFormComponent {
	private match: IMatch;
	private player1: IPlayer;
	private player2: IPlayer;
	private matchPatchedEvent: Subscription;
	private matchCreatedEvent: Subscription;
	@Output() onPlayersReady: EventEmitter<IMatch>;

	constructor(
		private playerRepo: PlayerRepo,
		private matchRepo: MatchRepo
	) {
		this.player1 = playerFactory();
		this.player2 = playerFactory();
		this.findMatch();
		this.matchCreatedEvent = this.matchRepo.subscribe('created')
			.subscribe(m => this.setPlayers(m));
		this.matchPatchedEvent = this.matchRepo.subscribe('patched')
			.subscribe(async m => this.setPlayers(m));
		this.onPlayersReady = new EventEmitter();
	}

	findMatch() {
		this.matchRepo.findOpenMatch().subscribe(m => this.setPlayers(m));
	}

	createMatch() {
		this.matchRepo.createMatch();
	}

	private async setPlayers(match: IMatch) {
		if(!match) return;

		this.match = match || this.match;
		if (!this.player1._id && match.player1Id) {

			this.player1 = await this.playerRepo.getPlayer(match.player1Id).toPromise();
		}
		if (!this.player2._id && match.player2Id) {
			this.player2 = await this.playerRepo.getPlayer(match.player2Id).toPromise();
		}
		if (!match.open && !match.finished) {
			this.matchPatchedEvent.unsubscribe();
			this.matchCreatedEvent.unsubscribe();
			this.onPlayersReady.emit(match);
		}
	}

	reset() {
		this.match = null;
		this.player1 = playerFactory();
		this.player2 = playerFactory();
	}

	get playersReady() {
		return !!this.player1.name && !!this.player2.name;
	}

	joinBtnDisabled(player: IPlayer) {
		return !this.match || !player.name || player._id;
	}

	setMatch(match: IMatch) {
		this.match = match;
	}

	async join(name: string) {
		let player = await this.playerRepo.findOrCreate(name).toPromise();
		let playerField = !this.match.player1Id ? 'player1Id' : 'player2Id';

		this.match[playerField] = player._id;
		this.matchRepo.patchMatch(this.match, [playerField, '_id'])
			.pipe(filter(m => !m.open && !m.finished))
			.subscribe(m => {
				this.matchPatchedEvent.unsubscribe();
				this.matchCreatedEvent.unsubscribe();
				this.onPlayersReady.emit(this.match);
			});
	}
}
