import { Component, OnInit } from '@angular/core';


import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  firebaseUser: any;

  constructor(private afAuth: AngularFireAuth) {

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
}
