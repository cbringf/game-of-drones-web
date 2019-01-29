import { IMatch } from './match.model';
import { IPlayer } from '../player/player.model';

export interface IMatchResponse extends IMatch {
	player1: IPlayer;
	player2: IPlayer;
}
