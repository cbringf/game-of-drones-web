import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import * as feathers from '@feathersjs/feathers';
import * as socketio from '@feathersjs/socketio-client';
import { environment } from '../../environments/environment';

@Injectable()
export class FeathersService {
	private client;

	constructor() {
		const socket = io(environment.api);

		this.client = feathers();
		this.client.configure(socketio(socket));
	}

	getService(name: string) {
		console.log(name);
		return this.client.service(name);
	}
}
