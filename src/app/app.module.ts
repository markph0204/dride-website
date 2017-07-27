import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';

// BS4 plugins
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MomentModule } from 'angular2-moment';
import { TruncateModule } from 'ng2-truncate';
import { MarkdownToHtmlModule } from 'ng2-markdown-to-html';
import { ElasticModule } from 'angular2-elastic';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { AgmCoreModule, AgmPolygon } from '@agm/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';

import { AuthService, NgbdModalLogin } from './auth.service';

import { UserService } from './user.service';

import { MainComponent } from './main/main.component';
import { CloudComponent } from './cloud/cloud.component';
import { CloudPaginationService } from './cloud/cloud-pagination.service';
import { ForumComponent, NgbdModalAskInForum} from './forum/forum.component';
import { NgbdModalPayement} from './store/payment.modal';
import { ThreadComponent } from './thread/thread.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
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

import { CodeComponent } from './shared/code/code.component';
import { AboutComponent } from './content/about/about.component';
import { NavComponent } from './layout/nav/nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { StoreComponent } from './store/store.component';
import { ProductComponent } from './store/product.component';
import { ProfileComponent, ShowClips, KeysPipe } from './profile/profile.component';
import { UploadVideoComponent } from './cloud/upload-video/upload-video.component';


const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'thread', redirectTo: 'forum' },
  { path: 'thread/:slug', component: ThreadComponent },
  { path: 'about', component: AboutComponent },
  { path: 'features', component: Dride1Component },
  { path: 'documentation', component: DocumentationComponent },
  { path: 'documentation/:slug', component: DocumentationComponent },
  { path: 'store', component: StoreComponent },
  { path: 'product/:productSlug', component: ProductComponent },
  { path: 'profile/:uid/:videoId', component: ProfileComponent },
  { path: 'profile/:uid', component: ProfileComponent },
  { path: 'cloud', component: CloudComponent },
  { path: 'uploadVideo', component: UploadVideoComponent },


  { path: 'page-not-found', component: PageNotFoundComponent },
  // { path: '**', component: PageNotFoundComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CloudComponent,
    ForumComponent,
    ThreadComponent,
    PageNotFoundComponent,
    NgbdModalLogin,
    NgbdModalAskInForum,
    NgbdModalPayement,
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
    ShowOnHomePage,
    CodeComponent,
    AboutComponent,
    NavComponent,
    FooterComponent,
    StoreComponent,
    ProductComponent,
    ProfileComponent,
    ShowClips,
    KeysPipe,
    UploadVideoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MomentModule,
    TruncateModule,
    MarkdownToHtmlModule.forRoot(),
    ElasticModule,
    FormsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApi
    }),
    InfiniteScrollModule
  ],
  providers: [AuthService, UserService, SideNavComponent, PageService, CloudPaginationService],
  bootstrap: [AppComponent],
  entryComponents: [NgbdModalLogin,
                    NgbdModalAskInForum,
                    NgbdModalPayement,
                    DocsMainComponent,
                    AdasComponent,
                    AssistantComponent,
                    ConnectivityComponent,
                    DrideCloudComponent,
                    GettingStartedComponent,
                    IndicatorsComponent,
                    ManualSetupComponent,
                    PublishComponent,
    ],
})
export class AppModule { }
