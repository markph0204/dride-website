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
import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';


import { AppComponent } from './app.component';

import { AuthService, NgbdModalLogin } from './auth.service';

import { UserService } from './user.service';

import { MainComponent } from './main/main.component';
import { CloudComponent } from './cloud/cloud.component';
import { ForumComponent, NgbdModalAskInForum} from './forum/forum.component';
import { ThreadComponent } from './thread/thread.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { InnerDocsComponent } from './documentation/inner-docs/inner-docs.component';
import { Dride1Component } from './content/dride1/dride1.component';
import { AdasComponent } from './documentation/inner-docs/pages/adas/adas.component';
import { AssistantComponent } from './documentation/inner-docs/pages/assistant/assistant.component';
import { ConnectivityComponent } from './documentation/inner-docs/pages/connectivity/connectivity.component';
import { DrideCloudComponent } from './documentation/inner-docs/pages/dride-cloud/dride-cloud.component';
import { GettingStartedComponent } from './documentation/inner-docs/pages/getting-started/getting-started.component';
import { IndicatorsComponent } from './documentation/inner-docs/pages/indicators/indicators.component';
import { ManualSetupComponent } from './documentation/inner-docs/pages/manual-setup/manual-setup.component';
import { PublishComponent } from './documentation/inner-docs/pages/publish/publish.component';


const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'cloud', component: CloudComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'thread', redirectTo: 'forum' },
  { path: 'thread/:slug', component: ThreadComponent },
  { path: 'documentation', component: DocumentationComponent },
  { path: 'features', component: Dride1Component },
  { path: 'c/:slug', component: InnerDocsComponent },
 
  //{ path: '**', component: PageNotFoundComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CloudComponent,
    ForumComponent,
    ThreadComponent,
    NgbdModalLogin,
    NgbdModalAskInForum,
    DocumentationComponent,
    InnerDocsComponent,
    Dride1Component,
    AdasComponent,
    AssistantComponent,
    ConnectivityComponent,
    DrideCloudComponent,
    GettingStartedComponent,
    IndicatorsComponent,
    ManualSetupComponent,
    PublishComponent
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
    FormsModule,
    HighlightJsModule
  ],
  providers: [AuthService, UserService, HighlightJsService],
  bootstrap: [AppComponent],
  entryComponents: [NgbdModalLogin, NgbdModalAskInForum],
})
export class AppModule { }
