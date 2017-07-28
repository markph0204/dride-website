import { Component, OnInit, Renderer } from '@angular/core';


import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../../user.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

	firebaseUser: any;
	isCollapsed = true;
	constructor(private afAuth: AngularFireAuth, private renderer: Renderer) {

		afAuth.authState.subscribe(user => {
			if (!user) {
				this.firebaseUser = null;
				return;
			}
			this.firebaseUser = user;

		});
	}

	setHeight(el, height) {
		if (!this.isCollapsed) {
			this.renderer.setElementStyle(el, 'height', height + 'px');
		}
	}

	logOut() {
		this.afAuth.auth.signOut();
		// TODO: alert
	}
	ngOnInit() {

	}
}
