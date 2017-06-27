import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "rxjs/add/observable/defer"
import "rxjs/add/observable/zip"
import "rxjs/add/operator/concatMap"
import "rxjs/add/operator/filter"
import "rxjs/add/operator/first"
import "rxjs/add/operator/map"
import "rxjs/add/operator/scan"
import "rxjs/add/operator/share"
import "rxjs/add/operator/startWith"
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.scss']
})
export class CloudComponent implements OnInit {
	hpClips: any;
	pageSize = 100;
	notifier = new Subject<any>();
	last: Observable<any>;

  //https://stackoverflow.com/questions/42085296/angularfire2-infinite-scrolling

  constructor(public af: AngularFireDatabase) {
	this.hpClips = Observable

	  // Use zip to combine the notifier's emissions with the last
	  // child value:

	  .zip(this.notifier, Observable.defer(() => this.last))

	  // Use concatMap to emit a page of children into the
	  // composed observable (note that first is used to complete
	  // the inner list):

	  .concatMap(([unused, last]) => this.af.list("clips_homepage", {
	      query: {

	        // If there is a last value, start at that value but ask
	        // for one more:

	        limitToFirst: last ? (this.pageSize + 1) : this.pageSize,
	        orderByChild: "lastUpdate",
	        startAt: last
	      }
	    })
	   .first()
	   )

	 // Use scan to accumulate the page into the infinite list:

	  .scan((acc, list) => {

	    // If this isn't the initial page, the page was started
	    // at the last value, so remove it from the beginning of
	    // the list:

	    if (acc.length > 0) {
	      list.shift();
	    }
	    return acc.concat(list);
	  }, [])

	  // Use share so that the last observable (see below) doesn't
	  // result in a second subscription:

	  .share();

	// Each time a page is emitted, map to its last child value so
	// that it can be fed back into the composed infinite list:

	this.last = this.hpClips
	  .filter((list) => list.length > 0)
	  .map((list) => list[list.length - 1].date_published)
	  .startWith(null);

	this.hpClips.subscribe((list) => console.log(list));

	// Each time the notifier emits, another page will be retrieved
	// and added to the infinite list:

	this.notifier.next();
	this.notifier.next();
	this.notifier.next();
	  

  }

  ngOnInit() {
  }

}
