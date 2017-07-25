import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase/app';

import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {


  threads: any;

  constructor(db: AngularFireDatabase, private modalService: NgbModal) {


    this.threads = db.list('/threads', {
      query: {
        orderByChild: 'lastUpdate',
        orderByKey: true
      }
    }).map((arr) => arr.reverse());

  }

  ngOnInit() {
  }

  ask() {
    this.modalService.open(NgbdModalAskInForum, { size: 'lg' });
  }

}


@Component({
  selector: 'ngbd-modal-content',
  templateUrl: '../../assets/templates/modal/askInForum/modal.html',
  styleUrls: ['../../assets/templates/modal/askInForum/modal.scss']
})
export class NgbdModalAskInForum {
  @Input() name;
  qTitle: any;
  isLoaded = true;
  showDanger = false
  
  constructor(public activeModal: NgbActiveModal,
    public db: AngularFireDatabase,
    private auth: AuthService,
    public user: UserService,
    private router: Router,
    private route: ActivatedRoute) {
  }


  closeModal = function () {
    this.activeModal.close();
  };


  dismissModal = function () {
    this.activeModal.dismiss();
  };

  slugify(text, id) {

    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-') + '__' + id;

  }
  // TODO: Add animation
  openThread = function (title) {

    this.auth.verifyLoggedIn().then(result => {
      if (!title){
        this.showDanger = true;
        return;
      }
      this.firebaseUser = this.user.getUser()
      // add a new thread on Firebase
      this.db.list('/threads')
      .push({
        'title': title,
        'created': new Date().getTime(),
        'views': 0,
        'participants': [this.firebaseUser.uid],
        'description': '',
        'cmntsCount': 1,
        'lastUpdate': (new Date).getTime()
      }).then(ref => {


        this.db.object('/threads/' + ref.key).update({ slug: this.slugify(title, ref.key) }).then(res => {
          this.closeModal();
          // $location.path('thread/' + $scope.slugify(title, ref.key));
          this.router.navigate(['/thread/' + this.slugify(title, ref.key)], { relativeTo: this.route });
          // TODO: //$mixpanel.track('posted a new post');
        });



      });

    });



  };



}



