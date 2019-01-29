import { Component, NgZone } from "@angular/core";
import { PlayerRepo } from '../../repositories/player/player.repo';
import { IPlayer } from '../../repositories/player/player.model';
import { IMatch } from 'src/app/repositories/match/match.model';
import { MatchRepo } from 'src/app/repositories/match/match.repo';
import * as _ from 'lodash';

@Component({
	selector: 'match-page',
	templateUrl: './match.component.html',
	styleUrls: ['./match.component.css']
})
export class MatchComponent {
	players: IPlayer[];
	match: IMatch;

	constructor(
		private playerRepo: PlayerRepo,
		private matchRepo: MatchRepo) {
		this.players = []
		this.playerRepo.subscribe('patched').subscribe(p => {
			let playerIndex = _.findIndex(this.players, localPlayer => p._id === localPlayer._id);

			this.players[playerIndex] = p;
		});
		this.matchRepo.subscribe('patched').subscribe(m => this.match = m);
	}

	get playersReady() {
		return this.players.length > 1;
	}

	get currentPlayer() {
		return this.players.filter(p => p._id === this.match.onTurn)[0];
	}

	get player1() {
		return this.players[0];
	}

	get player2() {
		return this.players[1];
	}

	get winner() {
		if(!this.match.winner) {
			return null;
		}
		return this.players.filter(p => p._id === this.match.winner)[0];
	}

	async setMatch(match: IMatch) {
		this.match = match;

		this.players[0] = await this.playerRepo.getPlayer(match.player1Id).toPromise();
		this.players[1] = await this.playerRepo.getPlayer(match.player2Id).toPromise();
	}

	play(move: string) {
		let auxField = this.players[0]._id === this.match.onTurn ? 'player1' : 'player2';

		this.match.moves[auxField].push(move);
		this.matchRepo.patchMatch(this.match, ['moves', '_id']);
	}

	playAgain() {
		this.matchRepo.subscribe('created').subscribe(m => this.match = m);
		this.matchRepo.createMatch({
			player1Id: this.players[0]._id,
			player2Id: this.players[1]._id
		});
	}

	exit() {
		this.players = [];
		this.match = null;
	}
}
