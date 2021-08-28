import { Component, OnInit } from '@angular/core';
import { IAccount, IAccountVM } from 'models/account';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Status } from 'src/app/core/models/component-status';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ROUTES_MAP } from 'src/app/routes.map';
import { authorize } from 'utils/auth.util';
import { fullName } from 'utils/full-name';

@Component( {
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: [ './navbar.component.scss' ],
} )
export class NavbarComponent implements OnInit {

	loading: Status = Status.initial;
	loggedInAccount$ = new Observable<IAccountVM>();

	constructor ( public auth: AuthenticationService ) { }
	ngOnInit (): void {
		this.loggedInAccount$ = this.auth.loggedInAccount$.pipe(
			map( data => ( { ...data, fullName: fullName( data?.firstName, data?.lastName ) } as IAccountVM ) )
		);
	}

	get routerMap (): any {
		return { ...ROUTES_MAP };
	}

	onLogout = () => {
		this.loading = Status.starting;
		this.auth.logout();
		this.loading = Status.done;
	}

}
