import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

	public show: any = [false, false, false, false, false, false, false, false];
	displayCard = 0
	constructor() { }


	ngOnInit() {
	}

}
