import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISubscription } from 'models/subscription';
import { BaseCrudService } from '../models/base-crud-service';
import { HttpSearchOptions } from '../models/http-search-options';

@Injectable()
export class SubscriptionService extends BaseCrudService<ISubscription, HttpSearchOptions>{

	constructor ( public http: HttpClient ) {
		super( http );
		this.apiUrl = 'api/subscriptions';

		console.log( '**** SubscriptionService - fetch ' );

		this.fetch().toPromise();
	}
}
