import { Injectable } from '@angular/core';
import { from, of, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators'
import { IPlayer } from './player.model';
import { FeathersService } from 'src/app/services/feathers.service';
import { IService } from 'src/app/services/service.shape';

@Injectable()
export class PlayerRepo {
	playerService: IService;
	subscriptions: { [key: string]: Observable<IPlayer> };

	constructor(feathersService: FeathersService) {
		this.playerService = feathersService.getService('player');
		this.subscriptions = {};
	}

	getPlayer(id: string) {
		return this.playerService.get(id);
	}

	getAllPlayers() {
		return this.playerService.find({ query: { $limit: 10000 } })
			.pipe(map((res: any) => res.data as IPlayer[]));
	}

	findOrCreate(name: string) {
		return this.playerService.find({
			query: {
				name: name
			}
		})
			.pipe(switchMap((res: any) => {
				if (res.total === 0) {
					return this.playerService.create({
						name: name
					});
				}
				else {
					return of(res.data[0]);
				}
			}));
	}

	updatePlayer(player: IPlayer) {
		return from(this.playerService.patch(player._id, { record: player.record }));
	}

	subscribe(event: string) {
		if (!this.subscriptions[event]) {
			this.subscriptions[event] = this.playerService.on<IPlayer>(event);
		}
		return this.subscriptions[event];
	}
}
