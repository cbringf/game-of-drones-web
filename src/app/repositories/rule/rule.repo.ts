import { Injectable } from "@angular/core";
import { of, Observable, concat, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { FeathersService } from 'src/app/services/feathers.service';
import { IRule } from './rule.model';

@Injectable()
export class RuleRepo {
	private ruleService: any;
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
		// if(!this.findRulesObservable) {
		// 	this.findRulesObservable = of(this.ruleService.find());
		// }
		return !this.rules ? from(this.ruleService.find({}))
			.pipe(map((res: any) => {
				this.rules = res.data as IRule[];
				return this.rules;
			})) : of(this.rules);
	}

	removeRule(id: string) {
		return from(this.ruleService.remove(id))
		.pipe(map((res: any)=> _.remove(this.rules, r=>r._id === res._id)));
	}

	getMoves() {
		if(this.rules) {
			_.map(this.rules, r=>r.move);
		}
		else {
			return from(this.ruleService.find({}))
			.pipe(map((res: any) => {
				this.rules = res.data as IRule[];
				return _.map(this.rules, r=> r.move);
			}))
		}
	}
}
