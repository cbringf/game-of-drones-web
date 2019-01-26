export interface IService {
	get(id: string): Promise<any>;
	find(params: any): Promise<any>;
	create(data: any): Promise<any>;
	update(id: string, data: any): Promise<any>;
	patch(id: string, data: any): Promise<any>
	remove(id: string): Promise<any>;
}
