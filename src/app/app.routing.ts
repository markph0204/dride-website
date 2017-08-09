import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { CloudComponent } from './cloud/cloud.component';

import { ForumComponent } from './forum/forum.component';
import { ThreadComponent } from './thread/thread.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { DocsMainComponent } from './documentation/pages/main.component';
import { StoreComponent } from './store/store.component';
import { ProductComponent } from './store/product.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadVideoComponent } from './cloud/upload-video/upload-video.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
	{ path: '', component: MainComponent },
	{ path: 'forum', component: ForumComponent },
	{ path: 'thread', redirectTo: 'forum' },
	{ path: 'thread/:slug', loadChildren: './thread/thread.module#ThreadModule' },
	{ path: 'forum/:slug', loadChildren: './thread/thread.module#ThreadModule' },
	{ path: 'about', loadChildren: './content/about/about.module#AboutModule'  },
	{ path: 'features', loadChildren: './content/dride1/dride1.module#Dride1Module' },
	{ path: 'documentation', component: DocumentationComponent },
	{ path: 'documentation/:slug', component: DocumentationComponent },
	{ path: 'store', component: StoreComponent },
	{ path: 'product/:productSlug', component: ProductComponent },
	{ path: 'profile/:uid/:videoId', component: ProfileComponent },
	{ path: 'profile/:uid', component: ProfileComponent },
	{ path: 'cloud', component: CloudComponent },
	{ path: 'cloud/uploadVideo', component: UploadVideoComponent },
	{ path: 'settings', component: SettingsComponent },


	{ path: 'page-not-found', component: PageNotFoundComponent },
	// { path: '**', component: PageNotFoundComponent }
];


export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

