import { Component, OnInit } from '@angular/core';
import { introAnim } from '../router.animations';
import { HttpClientModule } from '@angular/common/http';

import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { PageScrollConfig } from 'ng2-page-scroll';
import { InViewport } from '../helpers/in-viewport.directive';


@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
	animations: [introAnim]
})
export class MainComponent implements OnInit {

	public show: any = [false, false, false, false, false, false, false, false];
	displayCard = 0
	preSubmit = true
	isLoaded = false
	currentElementInView = 0

	constructor() {

		PageScrollConfig.defaultDuration = 800;
		PageScrollConfig.defaultEasingLogic = {
			ease: (t: number, b: number, c: number, d: number): number => {
				// easeInOutExpo easing
				if (t === 0) return b;
				if (t === d) return b + c;
				if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
				return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
			}
		};
	}

	action(event, pos) {
		if (event) {
			this.currentElementInView = pos - 1
			this.show[pos] = true;
		}
	}

	ngOnInit() {
		this.isLoaded = true;
	}

	sendDetails = function (email) {


		this.preSubmit = false;
		// TODO: subscibre users

		// let url = 'https://mysubscriptionlist.us13.list-manage.com/subscribe/post-json?u=b0c935d6f51c1f7aaf1edd8ff&id=9d740459d3&subscribe=Subscribe&EMAIL=templth@yahoo.fr&c=JSONP_CALLBACK';
		// jsonp.request(url, { method: 'Get' })
		// 	.subscribe((res) => { this.result = res.json() });


		// return this.http.get('https://api.dride.io/validator/subscribe.php?email=' + email).map(res =>  res.json())



	}
}
