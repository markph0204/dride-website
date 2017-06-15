import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  threads: FirebaseListObservable<any[]>;

  constructor(db: AngularFireDatabase) {

	this.threads = db.list('/threads');

  }

  ngOnInit() {
  }

}
