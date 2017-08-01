import { Component } from '@angular/core';
import { introAnim } from './router.animations';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [ introAnim ]
})
export class AppComponent {
	title = 'app';


	constructor() {

	}



}
