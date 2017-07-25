import { Component, Pipe, PipeTransform, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';


import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    map: any = { stroke: { "color": "#6060FB", "weight": 4 }, zoom: 16 }
    userHaveNoVideos: boolean = false;
    videoRoute: any = [];
    uid: string;
    videoId: string;
	public replyBox: string;
    clips: FirebaseListObservable<any>;
    orderedClips: any;
    currentVideoRef: FirebaseObjectObservable<any>;
    currentVideo: any;
    conversationPreviusIsMine: any = [];
    comments: any = {};
    opData: any;
    vgConfig: any;
    public firebaseUser: any;

    constructor(private db: AngularFireDatabase, private route: ActivatedRoute, public http: Http, private router: Router, private auth: AuthService, private afAuth: AngularFireAuth) {

    	//get Auth state
	    afAuth.authState.subscribe(user => {
	      if (!user) {
	        this.firebaseUser = null;        
	        return;
	      }
	      this.firebaseUser = user; 
	  
	    });

        this.route.params.subscribe(params => {

            this.userHaveNoVideos = false;
            this.videoRoute = [];
            this.uid = params['uid'];
            if (typeof params['videoId'] == "undefined") {
                var url =
                    environment.firebase.databaseURL + "/clips/" +
                    this.uid +
                    '.json?limitToLast=1&orderBy="$key"';
                this.http
                    .get(url)
                    .map(response => response.json())
                    .subscribe(data => {
                        if (data)
                            this.router.navigate(['/profile/' + this.uid + '/' + Object.keys(data)[0]]);
                        else
                            this.userHaveNoVideos = true
                    },
                    error => {
                        this.userHaveNoVideos = true;
                        //TODO: log this
                        console.log("An error occurred when requesting clips.");
                    }

                    )

            } else {

            	this.videoId = params['videoId'];
 
                this.comments = {};

                this.clips = db.list('/clips/' + this.uid, { preserveSnapshot: true });

                this.clips.subscribe(snapshot => {
                    this.orderedClips = this.orderClipsByDate(snapshot);
                });



            }


            if (params['uid'])
                this.opData = db.object('userData/' + params['uid']);

            this.ngOnInit()

        });



    }

    ngOnInit() {
    	if (!this.videoId || !this.uid)
    		return;

    	window.scrollTo(0,0);
        this.currentVideoRef = this.db.object('/clips/' + this.uid + '/' + this.videoId, { preserveSnapshot: true });


        this.currentVideoRef.subscribe(currentVideoSanp => {
            let data = currentVideoSanp.val();
            this.currentVideo = data
            //if video does not exist
            if (!data) {
                this.router.navigate(['/page-not-found']);
                return;
            }



            this.createVideoObj(data.clips.src, data.thumbs.src);
            //concat old comments with new ones
           	Object.assign(this.comments, data.comments)
            //load gps location
            if (!data.gps)
                return;

 			this.http
            .get(data.gps.src)
            .map(response => response.json())
            .subscribe(data => {
                    var s = this.prepGeoJsonToGoogleMaps(
                        data
                    );
                    var middleRoad = Math.ceil(s.length / 2)
                    this.map['center'] = {latitude: s[middleRoad].latitude, longitude: s[middleRoad].longitude};
                    this.map['path'] = s;
            },
                   error => {
                   	 this.userHaveNoVideos = true;
                   	 //TODO: log this
                     console.log("An error occurred when requesting clips.");
    				}

			)
	
        })


    }

    sideThreadByAuther = function(comments) {
        if (!comments) return;

        var previusKey = null;
        //angular.forEach(comments, function(k, key) {
        for (let key in comments){

            if (!previusKey) {
                previusKey = key;
                return;
            }
            //if same author posted again
            if (
                comments[key].autherId == comments[previusKey].autherId
            ) {
                this.conversationPreviusIsMine[previusKey] = true;
            } else {
                this.conversationPreviusIsMine[previusKey] = false;
            }
            previusKey = key;
        };
    };

    orderClipsByDate = function (clips) {
        var clipsBydate = {};
        //angular.forEach(clips, function(value, key) {
        clips.forEach(value => {

            let key: any = value.key
            var d = new Date(key * 1000);
            var iKey =
                d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();

            if (!clipsBydate[iKey]) clipsBydate[iKey] = {};

            clipsBydate[iKey][key] = value.val();
        });

        return clipsBydate;
    };

    preatifyDate = function (date) {
        if (!date)
            return '';

        var exp = date.split("-");
        var d = new Date(exp[2], exp[1], exp[0], 0, 0, 0, 0);

        return d;
    };
    //create the video object for videogular
    createVideoObj = function (clipURL, posterURL) {
        this.vgConfig = {
            preload: "none",
            sources: [{ src: clipURL, type: "video/mp4" }],
            theme: {
                url: "styles/videoPlayer.css"
            },
            plugins: {
                controls: {
                    autoHide: true,
                    autoHideTime: 5000
                },
                poster: posterURL
            }
        };
    };

    hasComments = function(comments) {
        return comments && Object.keys(comments).length ? true : false;
    };

    hasMoreToLoad = function() {

        if (!this.comments || typeof this.comments == "undefined")
            return false;

        return this.currentVideo &&
            this.currentVideo.cmntsCount >
                Object.keys(this.comments).length
            ? true
            : false;
    };
    isOwner(){
    	return this.uid == this.firebaseUser.uid
    }

    commentFoucs = function(){
		document.getElementById("replyBox").focus();
    }
    sendComment = function() {
    	console.log(this.replyBox)
        if (!this.replyBox) {
            alert("Please write something");              
            return;
        }

		this.auth.verifyLoggedIn().then( res => {
		    this.db.list('/conversations_video/' + this.uid + '/' + this.videoId)
		    .push({
		        autherId: res.uid,
		        auther: res.displayName,
		        pic: res.photoURL,
		        body: this.replyBox,
		        timestamp: new Date().getTime()
		    })
		    .then(res => {
		        this.loadMoreComments(this.videoId);
		        this.replyBox = '';
		    });
		    //TODO: track
		    //$mixpanel.track("posted a comment");
		})
    };

    //TODO: infinite scroll would be nice
    loadMoreComments = function() {


		this.http
        .get(environment.firebase.databaseURL + "/conversations_video/" + this.uid + "/" + this.videoId + ".json")
        .map(response => response.json())
        .subscribe(data => {
            var items = data;
            this.comments = items;

            this.conversationPreviusIsMine = [];
            this.sideThreadByAuther(this.comments);

        },
               error => {
               	 //TODO: log this
                 console.log("An error occurred when requesting comments.");
				}

		)


    };

    fbShare = function() {
        window.open(
            "https://www.facebook.com/sharer/sharer.php?u=https://dride.io/profile/" +
                this.uid +
                "/" +
                this.videoId,
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
    twShare = function() {
        var url = "https://dride.io/profile/" + this.uid + "/" + this.videoId;
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
    removeClip = function() {

    	if (!this.uid || !this.videoId){
    		console.error('Error: No Uid or videoId, Delete aborted')
    		return;
    	}
        //TODO: prompt before remove

        //firebase functions will take it from here..
		this.db.object('/clips/'+this.uid + '/' + this.videoId).update({  'deleted': true })


        this.router.navigate(['/profile/' + this.uid]);

    };

    prepGeoJsonToGoogleMaps = function(geoJson) {

        var videoRoute = [];
        Object.keys(geoJson).forEach(function(key) {
            geoJson[key] = JSON.parse(geoJson[key]);

            videoRoute.push({
                latitude: parseFloat(geoJson[key].latitude),
                longitude: parseFloat(geoJson[key].longitude)
            });


        });

        return videoRoute;
    };
}


@Pipe({
    name: 'showClips',
    pure: false
})
export class ShowClips {
    transform(clips) {
        return clips;

    }
}
@Pipe({
    name: 'keys',
    pure: false
})
export class KeysPipe implements PipeTransform {
    transform(value, args: string[]): any {
        return value ? Object.keys(value) : [];
    }
}


