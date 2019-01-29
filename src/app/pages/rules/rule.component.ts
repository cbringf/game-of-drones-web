import { Component } from "@angular/core";
import { RuleRepo } from 'src/app/repositories/rule/rule.repo';
import { Observable } from 'rxjs';
import { IRule } from 'src/app/repositories/rule/rule.model';
import { ruleFactory } from '../../tools/factories/rule.factory';

@Component({
	selector: 'rules-page',
	templateUrl: './rule.component.html',
	styleUrls: ['./rule.component.css']
})
export class RuleComponent {
	rules: Observable<IRule[]>;
	rule: IRule;

	constructor(private ruleRepo: RuleRepo) {
		this.reset();
	}

	get ruleReady() {
		return !!this.rule.kills && !!this.rule.move;
	}

	private reset() {
		this.rules = this.ruleRepo.getAllRules();
		this.rule = ruleFactory();
	}

	createRule() {
		this.ruleRepo.addRule(this.rule).subscribe(()=>{
			this.reset();
		});
	}

	removeRule(id: string) {
		this.ruleRepo.removeRule(id).subscribe(()=>{
			this.reset();
		});
	}
}
