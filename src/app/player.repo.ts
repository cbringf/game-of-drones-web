import { Injectable } from '@angular/core';
import { FeathersService } from './feathers.service';
import { from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'
import { IPlayer } from './player.model';

@Injectable()
export class PlayerRepo {
	findOrCreate(name: string, api: FeathersService) {
		const playerService = api.getService('player');

		return from(playerService.find({
			query: {
				name: name
			}
		}))
			.pipe(switchMap((res: any) => {
				console.log(res);
				if (res.total === 0) {
					console.log('crear nuevo');
					return from(playerService.create({ name: name }));
				}
				else {
					console.log('no cree');
					return of(res.data[0]);
				}
			}));
	}

	updatePlayer(player: IPlayer) {}
}
