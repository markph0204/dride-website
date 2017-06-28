import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";

import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { CloudPaginationService } from '../cloud/cloud-pagination.service';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';





@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.scss']
})
export class CloudComponent implements OnInit {
	hpClips: any;
	public firebaseUser: any;

	constructor(private db: AngularFireDatabase, public af: AngularFireDatabase, private dCloud: CloudPaginationService, private auth: AuthService, private afAuth: AngularFireAuth, private http: Http) {

		this.hpClips = this.dCloud

    	//get Auth state
	    afAuth.authState.subscribe(user => {
	      if (!user) {
	        this.firebaseUser = null;        
	        return;
	      }
	      this.firebaseUser = user; 
	  
	    });


	}

	ngOnInit() {
	}


	fbShare = function(uid, videoId) {
	    window.open(
	        "https://www.facebook.com/sharer/sharer.php?u=https://dride.io/profile/" +
	            uid +
	            "/" +
	            videoId,
	        "Facebook",
	        "toolbar=0,status=0,resizable=yes,width=" +
	            500 +
	            ",height=" +
	            600 +
	            ",top=" +
	            (window.innerHeight - 600) / 2 +
	            ",left=" +
	            (window.innerWidth - 500) / 2
	    );
	};
	twShare = function(uid, videoId) {
	    var url = "https://dride.io/profile/" + uid + "/" + videoId;
	    var txt = encodeURIComponent("You need to see this! #dride " + url);
	    window.open(
	        "https://www.twitter.com/intent/tweet?text=" + txt,
	        "Twitter",
	        "toolbar=0,status=0,resizable=yes,width=" +
	            500 +
	            ",height=" +
	            600 +
	            ",top=" +
	            (window.innerHeight - 600) / 2 +
	            ",left=" +
	            (window.innerWidth - 500) / 2
	    );
	};

    isOwner(uid){
    	return uid == this.firebaseUser.uid
    }


    removeClip = function(op, vId, index) {

    	if (!op || !vId){
    		console.error('Error: No Uid or videoId, Delete aborted')
    		return;
    	}
        //TODO: prompt before remove

        //firebase functions will take it from here..
		this.db.object('/clips/'+op + '/' + vId).update({  'deleted': true })


        this.hpClips.items.splice(index, 1)

    };

    commentFoucs = function(id){
		document.getElementById(id).focus();
    }

    hasComments = function(comments) {
        return comments && Object.keys(comments).length ? true : false;
    };

    hasMoreToLoad = function(currentVideo) {

        if (!currentVideo.comments || typeof currentVideo.comments == "undefined")
            return false;

        return currentVideo &&
            currentVideo.cmntsCount >
                Object.keys(currentVideo.comments).length
            ? true
            : false;
    };
    loadMoreComments(op, videoId, index){

		this.http
        .get(environment.firebase.databaseURL + "/conversations_video/" + op + "/" + videoId + ".json")
        .map(response => response.json())
        .subscribe(data => {
            var items = data;
            this.hpClips.items[index].comments = items;
        },
               error => {
               	 //TODO: log this
                 console.log("An error occurred when requesting comments.");
				}

		)


    };
}
