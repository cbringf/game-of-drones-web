import { Component, Input } from "@angular/core";
import { IPlayer } from 'src/app/repositories/player/player.model';

@Component({
	selector: 'player-info',
	templateUrl: './player-info.component.html',
	styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent {
	@Input() player: IPlayer;
}
