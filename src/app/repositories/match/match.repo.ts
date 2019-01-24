import { Observable } from 'rxjs';
import { IMatch } from './match.model';

export class MatchRepo {
	createMatch(): Observable<IMatch> {
		throw new Error('Not implemented');
	}
}
