import { Observable, from } from 'rxjs';
import { IMatch } from './match.model';
import { Injectable } from '@angular/core';
import { FeathersService } from 'src/app/services/feathers.service';

@Injectable()
export class MatchRepo {
	private matchService: any;

	constructor(private feathers: FeathersService) {
		this.matchService = feathers.getService('match');
	}

	createMatch(): Observable<IMatch> {
		return from(this.matchService.create({}));
	}

	updateMatch(match: IMatch) {
		return from(this.matchService.patch(match._id, match));
	}
}
