import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['../documentation.component.scss']
})
export class GettingStartedComponent implements OnInit {

  constructor() { }
  data: any = [];
  ngOnInit() {

  	this.data = [
				  	`dride/
├── package.json
│
├── node_modules/
│   ├── dride-ws/
│   ├── dride-core/
│   ├── dride-connectivity/
│   ├── dride-indicators/
│   ├── dride-cloud/
│   ├── dride-alexa/
│   └── ...
├── daemons/
│   ├── gps/
│   ├── bluetooth/
│   └── ...
├── startup.js
│
└── ...`
  	]


  }

}
