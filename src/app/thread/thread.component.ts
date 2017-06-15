import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {

  currentThread: FirebaseObjectObservable<any[]>;
  conversation: FirebaseListObservable<any[]>;
  threadId: string;
  private sub: any;
  
  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) {


  }

  ngOnInit() {

  	   this.sub = this.route.params.subscribe(params => {
       this.threadId = params['slug'].split('__').pop(); 

	   this.currentThread = this.db.object('/threads/' + this.threadId);
	   this.conversation = this.db.list('/conversations/' + this.threadId);

       console.log(this.threadId)

    });


  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
