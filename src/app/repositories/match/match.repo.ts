import { Observable, from } from 'rxjs';
import { IMatch } from './match.model';
import { Injectable } from '@angular/core';
import { FeathersService } from 'src/app/services/feathers.service';
import { map } from 'rxjs/operators';
import { IMatchResponse } from './match-response.model';
import { IService } from 'src/app/services/service.shape';
import * as _ from 'lodash';

@Injectable()
export class MatchRepo {
	private matchService: IService;
	private subscriptions: { [key: string]: Observable<IMatch> };

	constructor(feathers: FeathersService) {
		this.matchService = feathers.getService('match');
		this.subscriptions = {};
	}

	findOpenMatch() {
		return this.matchService.find({ query: { open: true } })
			.pipe(map((res: any) => res.data as IMatchResponse[]))
			.pipe(map(res => res.length > 0 ? res[0] : null));
	}

	getAllMatches() {
		return from(this.matchService.find({ query: { $limit: 10000 } }))
			.pipe(map((res: any) => res.data as IMatchResponse[]));
	}

	createMatch(data: any = {}): Observable<IMatch> {
		return from(this.matchService.create(data));
	}

	patchMatch(match: IMatch, fields: string[]) {
		const data = _.pick(match, fields);

		return from(this.matchService.patch(match._id, data).pipe(map(m => m as IMatch)));
	}

	subscribe(event: string) {
		if (!this.subscriptions[event]) {
			this.subscriptions[event] = this.matchService.on<IMatch>(event);
		}
		return this.subscriptions[event];
	}
}
