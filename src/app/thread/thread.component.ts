import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

 
@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {

  currentThread: FirebaseObjectObservable<any[]>;
  conversation: FirebaseListObservable<any[]>;
  public threadId: string;
  public conversationPreviusIsMine: Array<boolean> = [];
  private sub: any;
  public replyBox: string;
  public firebaseUser: any;
  
  constructor(private route: ActivatedRoute, public db: AngularFireDatabase, private location:Location, private router:Router, private auth: AuthService, public user: UserService) {


  }

  ngOnInit() {

  	 this.sub = this.route.params.subscribe(params => {
     this.threadId = params['slug'].split('__').pop(); 


	   this.currentThread = this.db.object('/threads/' + this.threadId);
	   this.conversation = this.db.list('/conversations/' + this.threadId);

     this.conversation.subscribe(snapshot => {
        this.sideThreadByAuther(snapshot, this.conversationPreviusIsMine)
     })


    });


  }


  sideThreadByAuther(threadData, conversationPreviusIsMine) {

          var previusKey = null;
          console.log(threadData)
          threadData.forEach(function(k, key) {

              if (!key) {
                  previusKey = key;
                  return;
              }
              //if same author posted again
              if (threadData[key].autherId == threadData[previusKey].autherId) {
                  conversationPreviusIsMine[previusKey] = true;
              } else {
                  conversationPreviusIsMine[previusKey] = false;
              }
              previusKey = key;
          });

         
  }

  /*
  *  Will push a new conversation object to DB (Add a comment in threadId)
  */
  send(){
     
      this.auth.verifyLoggedIn().then( res => {
         console.log(this.replyBox)
           this.firebaseUser = this.user.getUser()
           this.db.list("conversations/" +this.threadId).push({
               'autherId': this.firebaseUser.uid,
               'auther': this.firebaseUser.displayName,
               'pic': this.firebaseUser.photoURL,
               'body': this.replyBox,
               'timestamp': (new Date).getTime()
           });

           this.replyBox = '';
           //TODO: //$mixpanel.track('posted a comment');

       })




  }

  openLogin(){
    this.auth.openLogin();
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
