import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { RuleRepo } from 'src/app/repositories/rule/rule.repo';
import { IPlayer } from 'src/app/repositories/player/player.model';
import { Observable } from 'rxjs';
import { IMove } from 'src/app/repositories/_models/move.model';

@Component({
	selector: 'move',
	templateUrl: './move.component.html',
	styleUrls: ['./move.component.css']
})
export class MoveComponent implements OnInit {
	@Input() player: IPlayer;
	@Output() onPlay: EventEmitter<string>;
	moves: string[];
	move: string;

	constructor(private ruleRepo: RuleRepo) {
		this.onPlay = new EventEmitter();
	}

	ngOnInit() {
		this.ruleRepo.getMoves().subscribe(m => {
			this.moves = m;
			this.move = '';
		});
	}

	play() {
		this.onPlay.emit(this.move);
	}
}
