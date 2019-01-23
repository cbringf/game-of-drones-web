import { Injectable } from '@angular/core';
import { IMove } from './move.model';
import { from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRule } from './rule.module';
import { IPlayer } from './player.model';

@Injectable()
export class PlayService {
	private player1: IPlayer;
	private player2:IPlayer;
	private onFinishFn: (winner: IPlayer)=> void;
	private hits: number;

	startPlay(player1: IPlayer, player2: IPlayer, onFinish: (winner: IPlayer) => void) {
		this.player1 = player1;
		this.player2 = player2;
		this.onFinishFn = onFinish;
		this.hits = 0;
	}

	addMove(player1Move: IMove, player2Move: IMove) {

	}
}
