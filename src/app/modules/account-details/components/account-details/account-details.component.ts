import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAccountVM } from 'models/account';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { fullName } from 'utils/full-name';

@Component( {
	selector: 'app-account-details',
	templateUrl: './account-details.component.html',
	styleUrls: [ './account-details.component.scss' ],
} )
export class AccountDetailsComponent implements OnInit {

	@Input() id = '';
	account: IAccountVM | null = null;
	constructor ( private route: ActivatedRoute, public auth: AuthenticationService ) { }

	ngOnInit (): void {
		this.init();
	}

	init = () => {
		if ( !this.id ) this.id = this.route.snapshot.paramMap.get( 'id' ) || '';
		if ( this.id ) {
			this.auth.data$.pipe(
				map( d => d.find( i => i.id === this.id ) ),
				map( i => ( { ...i, fullName: fullName( i?.firstName || '', i?.lastName || '' ) } as IAccountVM ) )
			).subscribe( d => this.account = d );
		}
	}

}
