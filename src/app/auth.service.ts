import { Injectable, Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { UserService } from './user.service';


@Injectable()
export class AuthService {

  closeResult: string;

  constructor(private modalService: NgbModal, public afAuth: AngularFireAuth) { }

  openLogin() {

    return this.modalService.open(NgbdModalContent);


  }


  logOut(){

      this.afAuth.auth.signOut().then(function() {
        // Sign-out successful.
        alert('ok!')
      }, function(error) {
        // An error happened.
      });


    };

  verifyLoggedIn(){
    return new Promise((resolve: any, reject) => {

            this.afAuth.authState.subscribe(user => {
              if (!user) {
                return this.openLogin()
              }
              resolve(user)
           
            });


    });
  }




}




@Component({
  selector: 'ngbd-modal-content',
  templateUrl: '../assets/templates/modal/modal.html',
  styleUrls: ['../assets/templates/modal/modal.scss']
})
export class NgbdModalContent {
  @Input() name;

  isLoaded:boolean = false;
  onWelcome:boolean = false;
  anonymous:boolean = false;
  public loginError:string;
  userData: FirebaseListObservable<any[]>;


  constructor(public activeModal: NgbActiveModal, public afAuth: AngularFireAuth, user: UserService, public db: AngularFireDatabase) { 
    this.user = afAuth.authState;
  }


  user: Observable<firebase.User>;

  closeModal = function () {
    this.activeModal.close();
  };


  dismissModal = function () {
    this.activeModal.dismiss();
  };

  connectWithFacebook = function () {

    this.connectWithProvider(new firebase.auth.FacebookAuthProvider())

  };

  connectWithGoogle = function () {

    this.connectWithProvider(new firebase.auth.GoogleAuthProvider())

  };

  connectWithProvider = function (provider: any) {

    // login with Facebook
    this.afAuth.auth.signInWithPopup(provider)
    .catch(error => {
      this.loginError = error.message;
      console.log("Authentication failed:", error);
      //TODO: Show friendly message and log
    });

    this.afAuth.authState.subscribe(user => {

      if (!user)
        return;
      //TODO: //$mixpanel.track('successful login');

      //ensure push token
      //TODO: //pushNotification.getPushToken(res.uid)

      this.db.object('/userData/' + user.uid).subscribe(data => {
        if (data.showedAnonymous == true) {
          this.closeModal();
        } else {
          //first time logged in
          //mixpanel.alias(data.uid)
          this.onWelcome = true;
          firebase.database().ref('userData').child(user.uid).update({ showedAnonymous: true });
        }

      });



    })


  };



}



