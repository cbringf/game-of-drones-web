import { IService } from './service.shape';
import { Observable, Subject } from 'rxjs';

export abstract class ServiceBase implements IService {
	abstract get(id: string): Observable<any>;
	abstract find(params: any): Observable<any>;
	abstract create(data: any): Observable<any>;
	abstract update(id: string, data: any): Observable<any>;
	abstract patch(id: string, data: any): Observable<any>;
	abstract remove(id: string): Observable<any>;
	abstract on<T>(event: string): Observable<T>;
}
