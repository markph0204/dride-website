import { Injectable, Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Injectable()
export class AuthService {

  user: Observable<firebase.User>;
  closeResult: string;

  constructor(public afAuth: AngularFireAuth, private modalService: NgbModal) {
  	this.user = afAuth.authState;
  }

  openLogin(){

    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';


  }




  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
@Component({
  selector: 'ngbd-modal-content',
  templateUrl: '../assets/templates/modal.html'
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}



