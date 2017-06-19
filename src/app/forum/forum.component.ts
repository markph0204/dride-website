import { Component, OnInit } from '@angular/core';
import "rxjs/add/operator/map";


import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {


  threads: any;

  constructor(db: AngularFireDatabase) {


	this.threads = db.list('/threads', {
		    query: {
		    orderByChild: 'lastUpdate',
		    orderByKey: true
		  }
		}).map( (arr) => { return arr.reverse(); } );

  }

  ngOnInit() {
  }

}
