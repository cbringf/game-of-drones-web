import { Injectable } from "@angular/core";
import { of, Observable, concat, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { IRule } from './rule.model';
import { FeathersService } from '../../services/feathers.service';
import { IService } from 'src/app/services/service.shape';

@Injectable()
export class RuleRepo {
	private ruleService: IService;
	private rules: IRule[];

	constructor(private feathersService: FeathersService) {
		this.ruleService = feathersService.getService('rule');
	}

	addRule(rule: IRule) {
		return from(this.ruleService.create(rule))
			.pipe(map((res: any) => {
				this.rules.push(res);
				return res;
			}));
	}

	getAllRules(): Observable<IRule[]> {
		return !this.rules ? from(this.ruleService.find({ query: { $limit: 100 } }))
			.pipe(map((res: any) => {
				this.rules = res.data as IRule[];
				return this.rules;
			})) : of(this.rules);
	}

	removeRule(id: string) {
		return from(this.ruleService.remove(id))
			.pipe(map((res: any) => _.remove(this.rules, r => r._id === res._id)));
	}

	getMoves() {
		if (this.rules) {
			return of(_.map(this.rules, r => r.move));
		}
		else {
			return from(this.ruleService.find({}))
				.pipe(map((res: any) => {
					this.rules = res.data as IRule[];
					return _.map(this.rules, r => r.move);
				}))
		}
	}
}
