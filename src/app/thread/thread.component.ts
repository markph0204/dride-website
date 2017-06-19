import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

import { AuthService } from '../auth.service';

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
  public conversationPreviusIsMine: Array<boolean> = [];
  private sub: any;
  public replyBox: string;
  
  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private location:Location, private router:Router, private auth: AuthService) {


  }

  ngOnInit() {

  	 this.sub = this.route.params.subscribe(params => {
     this.threadId = params['slug'].split('__').pop(); 


	   this.currentThread = this.db.object('/threads/' + this.threadId);
	   this.conversation = this.db.list('/conversations/' + this.threadId);

     this.conversation.subscribe(snapshot => {
       console.log(this.conversationPreviusIsMine)
        this.sideThreadByAuther(snapshot, this.conversationPreviusIsMine)
     })
       console.log(this.threadId)

    });


  }


  sideThreadByAuther(threadData, conversationPreviusIsMine) {

          var previusKey = null;
          threadData.forEach(function(k, key) {

              if (!previusKey) {
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


  send(){

      this.auth.login()
      
      // login.verifyLoggedIn().then(
      //  function(result) {

      //      firebase.database().ref("conversations").child(this.threadId).push({
      //          'autherId': $rootScope.firebaseUser.uid,
      //          'auther': $rootScope.firebaseUser.displayName,
      //          'pic': $rootScope.firebaseUser.photoURL,
      //          'body': $scope.replyBox,
      //          'timestamp': (new Date).getTime()
      //      });

      //      this.replyBox = '';
      //      //$mixpanel.track('posted a comment');

      //  })




  }

  openLogin(){
    this.auth.openLogin();
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
