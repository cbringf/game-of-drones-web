import { Injectable } from '@angular/core';
import { FeathersService } from './feathers.service';
import { from, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators'
import { IPlayer } from './player.model';

@Injectable()
export class PlayerRepo {
	playerService: any;

	constructor(feathersService: FeathersService) {
		this.playerService = feathersService.getService('player');
	}

	findOrCreate(name: string) {
		return from(this.playerService.find({
			query: {
				name: name
			}
		}))
			.pipe(switchMap((res: any) => {
				console.log(res);
				if (res.total === 0) {
					console.log('crear nuevo');
					return from(this.playerService.create({ name: name, record: 0 }))
						.pipe(map(p => {
							p['hits'] = 0;
							return p;
						}));
				}
				else {
					console.log('no cree');
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
