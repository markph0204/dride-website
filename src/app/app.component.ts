import { Component } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'app';
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
}
