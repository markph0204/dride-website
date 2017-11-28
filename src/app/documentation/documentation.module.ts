import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DocsMainComponent, ShowOnHomePage } from '../documentation/pages/main/main.component';
import { AdasComponent } from '../documentation/pages/adas/adas.component';
import { AssistantComponent } from '../documentation/pages/assistant/assistant.component';
import { ConnectivityComponent } from '../documentation/pages/connectivity/connectivity.component';
import { DrideCloudComponent } from '../documentation/pages/drideCloud/dride-cloud.component';
import { GettingStartedComponent } from '../documentation/pages/gettingStarted/getting-started.component';
import { IndicatorsComponent } from '../documentation/pages/indicators/indicators.component';
import { ManualSetupComponent } from '../documentation/pages/manualSetup/manual-setup.component';
import { PublishComponent } from '../documentation/pages/publish/publish.component';
import { UniversalComponent } from '../documentation/pages/drideUniversal/universal.component';
import { AssemblyComponent } from '../documentation/pages/assembly/assembly.component';
import { SideNavComponent } from '../documentation/layout/side-nav.component';
import { PageService } from '../documentation/pages.service';
import { DocsPageDirective } from '../documentation/pages.directive';

import { CodeComponent } from '../helpers/code/code.component';

import { DocumentationComponent } from './documentation.component';
import { routing } from './documentation.routing';
import { EditMeDirective } from './directive/edit-me.directive';
import { SubscribeBoxComponent } from '../layout/components/subscribe-box/subscribe-box.component';
import { CookieService } from 'ngx-cookie-service';

import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
	imports: [routing, FormsModule, CommonModule, SimpleNotificationsModule],
	declarations: [
					DocumentationComponent,
					CodeComponent,
					DocsMainComponent,
					AdasComponent,
					AssistantComponent,
					ConnectivityComponent,
					DrideCloudComponent,
					GettingStartedComponent,
					IndicatorsComponent,
					ManualSetupComponent,
					PublishComponent,
					AssemblyComponent,
					SideNavComponent,
					DocsPageDirective,
					ShowOnHomePage,
					UniversalComponent,
					EditMeDirective,
					SubscribeBoxComponent
				],
				entryComponents: [
					DocsMainComponent,
					AdasComponent,
					AssistantComponent,
					ConnectivityComponent,
					DrideCloudComponent,
					GettingStartedComponent,
					IndicatorsComponent,
					ManualSetupComponent,
					PublishComponent,
					UniversalComponent,
					AssemblyComponent,
					SubscribeBoxComponent
				],
				providers: [
					SideNavComponent,
					PageService,
					CookieService
				]
})
export class DocumentationModule { }
