import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { IPlayer } from '../repositories/player/player.model';
import { IRule } from '../repositories/rule/rule.model';
import { MAX_HITS_COUNT } from '../play.config';

@Injectable()
export class PlayService {
	private player1: IPlayer;
	private player2: IPlayer;
	private onFinishFn: (winner: IPlayer) => void;
	private rules: IRule[];

	startPlay(player1: IPlayer, player2: IPlayer, rules: IRule[], onFinish: (winner: IPlayer) => void) {
		this.player1 = player1;
		this.player2 = player2;
		this.onFinishFn = onFinish;
		this.rules = rules;
		console.log(player1);
	}

	addMove(player1Move: string, player2Move: string) {
		if (player1Move !== player2Move) {
			const winnerPlayer1 =
				_.filter(this.rules,
					(r) =>
						r.move === player1Move && r.kills === player2Move).length > 0;
			const winner = winnerPlayer1 ? this.player1 : this.player2;

			winner.hits++;

			if (winner.hits === MAX_HITS_COUNT) {
				this.onFinishFn(winner);
			}
		}
	}
}
