import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators'
import { IPlayer } from './player.model';
import { FeathersService } from 'src/app/services/feathers.service';

@Injectable()
export class PlayerRepo {
	playerService: any;

	constructor(feathersService: FeathersService) {
		this.playerService = feathersService.getService('player');
	}

	getAllPlayers() {
		return from(this.playerService.find({}))
			.pipe(map((res: any) => res.data as IPlayer[]));
	}

	findOrCreate(name: string) {
		return from(this.playerService.find({
			query: {
				name: name
			}
		}))
			.pipe(switchMap((res: any) => {
				if (res.total === 0) {
					return from(this.playerService.create({ name: name, record: 0 }))
						.pipe(map(p => {
							p['hits'] = 0;
							return p;
						}));
				}
				else {
					return of(res.data[0]).pipe(map(p => {
						p['hits'] = 0;
						return p;
					}));
				}
			}));
	}

	updatePlayer(player: IPlayer) {
		return from(this.playerService.patch(player._id, { record: player.record }));
	}
}
