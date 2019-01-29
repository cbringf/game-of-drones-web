export interface IMatch {
	_id: string;
	player1Id?: string;
	player2Id?: string;
	moves: {
		player1: string[],
		player2: string[]
	};
	winner?: string;
	open: boolean;
	finished: boolean;
	onTurn: string;
}
