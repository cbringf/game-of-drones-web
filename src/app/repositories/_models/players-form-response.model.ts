import { IPlayer } from '../player/player.model';
import { IMatch } from '../match/match.model';

export interface IPlayersFormResponse {
	player1: IPlayer;
	player2: IPlayer;
	match: IMatch;
}
