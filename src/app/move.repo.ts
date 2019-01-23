import { Injectable } from "@angular/core";
import { IMove } from './move.model';

@Injectable()
export class MoveRepo {
	addMove(move: IMove) {}

	getAllMoves() {}
}
