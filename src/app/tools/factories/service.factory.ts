import { ServiceBase } from 'src/app/services/service.base';
import { Observable, Subject, from } from 'rxjs';

export const serviceFactory = (feathersService: any) => {
	return new FeathersService(feathersService);
};

class FeathersService extends ServiceBase {
	constructor(private feathersService: any) {
		super();
	}

	get(id: string) {
		return from(this.feathersService.get(id))
	}

	find(params: any): Observable<any> {
		return from(this.feathersService.find(params));
	}

	create(data: any): Observable<any> {
		return from(this.feathersService.create(data));
	}

	update(id: string, data: any): Observable<any> {
		return from(this.feathersService.update(id, data));
	}

	patch(id: string, data: any): Observable<any> {
		return from(this.feathersService.patch(id, data));
	}

	remove(id: string): Observable<any> {
		return from(this.feathersService.remove(id));
	}

	on<T>(event: string): Observable<T> {
		const subject: Subject<T> = new Subject();

		this.feathersService.on(event, (data: T) => {
			subject.next(data);
		});
		return subject.asObservable();
	}
}
