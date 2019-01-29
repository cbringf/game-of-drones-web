import { Observable } from 'rxjs';

export interface IService {
	get(id: string): Observable<any>;
	find(params: any): Observable<any>;
	create(data: any): Observable<any>;
	update(id: string, data: any): Observable<any>;
	patch(id: string, data: any): Observable<any>
	remove(id: string): Observable<any>;
	on<T>(event: string): Observable<T>;
}
