import { Injectable, Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from './user.service';


@Injectable()
export class AuthService {

  closeResult: string;

  constructor(private modalService: NgbModal) { }

  openLogin() {

    const modalRef = this.modalService.open(NgbdModalContent);


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

  constructor(public activeModal: NgbActiveModal, public afAuth: AngularFireAuth, user: UserService) { 
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

    // login with Facebook
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res =>  {
      //TODO: //$mixpanel.track('successful login');
      //TODO: //$rootScope.uid = firebaseUser.user.uid;

      //ensure push token
      //TODO: //pushNotification.getPushToken($rootScope.uid)

      //TODO: // userData($rootScope.uid).$loaded(function (data) {
      //   if (data.showedAnonymous == true) {
      //     $scope.closeModal();
      //   } else {
      //     //first time logged in
      //     mixpanel.alias($rootScope.uid)
      //     $scope.onWelcome = true;
      //     firebase.database().ref('userData').child($rootScope.uid).set({ showedAnonymous: true });
      //   }

      // });


    })
    .catch(error => {
      this.loginError = error.message;
      console.log("Authentication failed:", error);
      //TODO: Show friendly message and log


    });


  };


  connectWithGoogle = function () {

    // login with Facebook
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res =>  {

      //TODO: //$mixpanel.track('successful login');
      //TODO: //$rootScope.uid = firebaseUser.user.uid;
      //ensure push token
      //TODO: //pushNotification.getPushToken($rootScope.uid)

      //TODO: // userData($rootScope.uid).$loaded(function (data) {
      //   if (data.showedAnonymous == true) {
      //     $scope.closeModal();
      //   } else {
      //     //first time logged in
      //     mixpanel.alias($rootScope.uid)
      //     $scope.onWelcome = true;
      //     firebase.database().ref('userData').child($rootScope.uid).update({ showedAnonymous: true });
      //   }

      // });



    }).catch(error => {
      this.loginError = error.message;
      console.log("Authentication failed:", error);
      //TODO: Show friendly message and log


    });


  };



  closeAfterWelcome = function () {

    //firebase functions will take it from there..
    //TODO: //firebase.database().ref('userData').child($rootScope.uid).update({ anonymous: $scope.anonymous });
    this.activeModal.closeModal()
  }



}



