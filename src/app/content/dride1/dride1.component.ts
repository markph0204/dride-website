import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-dride1',
  templateUrl: './dride1.component.html',
  styleUrls: ['./dride1.component.scss']
})
export class Dride1Component implements OnInit {

	preSubmit:boolean = true

	constructor(public http: Http) {
	    this.http = http
	}

	ngOnInit() {
	}

	sendDetails = function(email){

		console.log(email)

	 //    this.preSubmit = false;
		
		// return this.http.get('https://api.dride.io/validator/subscribe.php?email=' + email).map(res =>  res.json())
		


	}

}
