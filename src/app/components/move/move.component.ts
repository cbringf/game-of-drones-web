import { Component, Input, Output, EventEmitter } from "@angular/core";
import { RuleRepo } from 'src/app/repositories/rule.repo';
import { IPlayer } from 'src/app/repositories/player/player.model';
import { Observable } from 'rxjs';
import { IMove } from 'src/app/repositories/_models/move.model';

@Component({
	selector: 'move',
	templateUrl: './move.component.html',
	styleUrls: ['./move.component.css']
})
export class MoveComponent {
	@Input() player: IPlayer;
	@Output() onPlay: EventEmitter<IPlayer>;
	moves: Observable<string[]>;

	constructor(private ruleRepo: RuleRepo) {
		this.moves = this.ruleRepo.getMoves();
	}

	play() {
		this.onPlay.emit(this.player);
	}
}
