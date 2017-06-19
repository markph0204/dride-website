import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MomentModule } from 'angular2-moment';
import { TruncateModule } from 'ng2-truncate';
import { MarkdownToHtmlModule } from 'ng2-markdown-to-html';
import { ElasticModule } from 'angular2-elastic';
import { NgSwitchModule } from 'ng2-switch';


import { AppComponent } from './app.component';

import { AuthService, NgbdModalContent } from './auth.service';
import { UserService } from './user.service';

import { MainComponent } from './main/main.component';
import { CloudComponent } from './cloud/cloud.component';
import { ForumComponent } from './forum/forum.component';
import { ThreadComponent } from './thread/thread.component';


const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'cloud', component: CloudComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'thread', redirectTo: 'forum' },
  { path: 'thread/:slug', component: ThreadComponent },
 
  //{ path: '**', component: PageNotFoundComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CloudComponent,
    ForumComponent,
    ThreadComponent,
    NgbdModalContent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MomentModule,
    TruncateModule,
    MarkdownToHtmlModule.forRoot(),
    ElasticModule,
    FormsModule
  ],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent],
  entryComponents: [NgbdModalContent],
})
export class AppModule { }
