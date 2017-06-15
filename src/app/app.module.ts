import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MomentModule } from 'angular2-moment';
import { TruncateModule } from 'ng2-truncate';
import { MarkdownToHtmlModule } from 'ng2-markdown-to-html';
import { ElasticModule } from 'angular2-elastic';


import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CloudComponent } from './cloud/cloud.component';
import { ForumComponent } from './forum/forum.component';
import { ThreadComponent } from './thread/thread.component';


const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'cloud', component: CloudComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'thread/:slug', component: ThreadComponent },
 
  //{ path: '**', component: PageNotFoundComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CloudComponent,
    ForumComponent,
    ThreadComponent
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
    ElasticModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
