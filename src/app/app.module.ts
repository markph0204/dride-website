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
import { Dride1Component } from './content/dride1/dride1.component';
import { DocsMainComponent, ShowOnHomePage } from './documentation/pages/main.component';
import { AdasComponent } from './documentation/pages/adas.component';
import { AssistantComponent } from './documentation/pages/assistant.component';
import { ConnectivityComponent } from './documentation/pages/connectivity.component';
import { DrideCloudComponent } from './documentation/pages/dride-cloud.component';
import { GettingStartedComponent } from './documentation/pages/getting-started.component';
import { IndicatorsComponent } from './documentation/pages/indicators.component';
import { ManualSetupComponent } from './documentation/pages/manual-setup.component';
import { PublishComponent } from './documentation/pages/publish.component';
import { SideNavComponent } from './documentation/layout/side-nav.component';
import { PageService } from './documentation/pages.service';
import { DocsPageDirective } from './documentation/pages.directive';


const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'cloud', component: CloudComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'thread', redirectTo: 'forum' },
  { path: 'thread/:slug', component: ThreadComponent },
  { path: 'features', component: Dride1Component },
  { path: 'documentation', component: DocumentationComponent },
  { path: 'documentation/:slug', component: DocumentationComponent },
 
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
    Dride1Component,
    DocsMainComponent,
    AdasComponent,
    AssistantComponent,
    ConnectivityComponent,
    DrideCloudComponent,
    GettingStartedComponent,
    IndicatorsComponent,
    ManualSetupComponent,
    PublishComponent,
    SideNavComponent,
    DocsPageDirective,
    ShowOnHomePage
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
  providers: [AuthService, UserService, HighlightJsService, SideNavComponent, PageService],
  bootstrap: [AppComponent],
  entryComponents: [NgbdModalLogin,
                    NgbdModalAskInForum,
                    DocsMainComponent,
                    AdasComponent,
                    AssistantComponent,
                    ConnectivityComponent,
                    DrideCloudComponent,
                    GettingStartedComponent,
                    IndicatorsComponent,
                    ManualSetupComponent,
                    PublishComponent
    ],
})
export class AppModule { }
