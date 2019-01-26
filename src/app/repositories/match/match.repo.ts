import { Observable, from } from 'rxjs';
import { IMatch } from './match.model';
import { Injectable } from '@angular/core';
import { FeathersService } from 'src/app/services/feathers.service';
import { map } from 'rxjs/operators';
import { IMatchResponse } from './match-response.model';
import { IService } from 'src/app/services/service.shape';

@Injectable()
export class MatchRepo {
	private matchService: IService;

	constructor(private feathers: FeathersService) {
		this.matchService = feathers.getService('match');
	}

	getAllMatches() {
		return from(this.matchService.find({ query: { $limit: 100 } }))
			.pipe(map((res: any) => res.data as IMatchResponse[]));
	}

	createMatch(): Observable<IMatch> {
		return from(this.matchService.create({}));
	}

	updateMatch(match: IMatch) {
		return from(this.matchService.patch(match._id, match));
	}
}
