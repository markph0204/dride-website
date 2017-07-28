import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-dride1',
  templateUrl: './dride1.component.html',
  styleUrls: ['./dride1.component.scss']
})
export class Dride1Component implements OnInit {

	preSubmit = true

	constructor(public http: Http) {
		this.http = http
	}

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
