import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { introAnim } from '../router.animations';


@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
	animations: [ introAnim ]
})
export class MainComponent implements OnInit {

	public show: any = [false, false, false, false, false, false, false, false];
	displayCard = 0
	preSubmit = true

	constructor() { }


	ngOnInit() {
	}

	sendDetails = function(email){


		this.preSubmit = false;
		// TODO: subscibre users

		// let url = 'https://mysubscriptionlist.us13.list-manage.com/subscribe/post-json?u=b0c935d6f51c1f7aaf1edd8ff&id=9d740459d3&subscribe=Subscribe&EMAIL=templth@yahoo.fr&c=JSONP_CALLBACK';
		// jsonp.request(url, { method: 'Get' })
		// 	.subscribe((res) => { this.result = res.json() });


		// return this.http.get('https://api.dride.io/validator/subscribe.php?email=' + email).map(res =>  res.json())



	}
}
