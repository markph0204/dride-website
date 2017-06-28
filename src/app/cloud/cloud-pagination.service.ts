import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { environment } from '../../environments/environment';


@Injectable()
export class CloudPaginationService {

	items: Array<any> = [];
	busy:boolean = false;
	after: string = "9999999999999"; //highest key possible
	before: string = "";
	end:boolean = false;

   constructor(private http: Http) {


   }
   nextPage = function() {
            if (this.busy || this.end) return;
            this.busy = true;

            var url = environment.firebase.databaseURL + "/clips_homepage.json?orderBy=%22hpInsertTime%22&endAt=%22" + this.after + "%22&limitToLast=5";

                this.http
                    .get(url)
                    .map(response => response.json())
                    .subscribe(data => {

	                    var items = this.reverseObject(data);
	                    for (var item in items) {
	                        var config = {
	                            config: {
	                                preload: "none",
	                                sources: [
	                                    {
	                                        src: items[item].clips.src,
	                                        type: "video/mp4"
	                                    }
	                                ],
	                                theme: {
	                                    url: "styles/videoPlayer.css"
	                                },
	                                plugins: {
	                                    controls: {
	                                        autoHide: true,
	                                        autoHideTime: 5000
	                                    },
	                                    poster: items[item].thumbs.src
	                                }
	                            }
	                        };
	                        Object.assign(items[item], config)

	                        if (items[item].comments)
	                            items[item].comments = [];

	                        this.items.push(items[item]);
	                        this.after = items[item].hpInsertTime;

	                    }

	                    this.busy = false;

	                    if (this.after == this.before) {
	                        this.end = true;
	                        return;
	                    }

	                    this.before = this.after;
	                    //remove last element because he is the first element from next batch
	                    this.items.pop();


                    },
                    error => {
                        this.end = true
                        //TODO: log this
                        console.log("An error occurred when requesting cloud clips.");
                    }

                    )


        };

            reverseObject(object) {
                var newObject = {};
                var keys = [];
                for (var key in object) {
                    keys.push(key);
                }
                for (var i = keys.length - 1; i >= 0; i--) {
                    var value = object[keys[i]];
                    newObject[keys[i]] = value;
                }

                return newObject;
            }
}
