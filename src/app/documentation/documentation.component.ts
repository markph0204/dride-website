import { Component, Input, ViewChild, ComponentFactoryResolver, ViewEncapsulation, OnInit, Directive, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DocsPageDirective } from './pages.directive';
import { PageComponent } from './page.component';
import { PageService } from './pages.service';
import { PageItem } from './page-item';
import { SideNavComponent } from './layout/side-nav.component';


@Component({
	selector: 'app-documentation',
	templateUrl: './documentation.component.html',
	styleUrls: ['./documentation.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class DocumentationComponent implements OnInit {
	//@Input() pages: PageItem[];
	@Input() pages: Object;

	@ViewChild(DocsPageDirective) pageHost: DocsPageDirective;

	public docMenu: any[]

	constructor(sideNav: SideNavComponent, private _componentFactoryResolver: ComponentFactoryResolver, private pageService: PageService, private route: ActivatedRoute) {
		this.docMenu = sideNav.docMenu;
	}

	ngOnInit() {
		this.pages = this.pageService.getPages();
		this.route.params.subscribe(params => {
			if (params.slug)
				this.loadComponent(params.slug);
			else
				this.loadComponent('DocsMainComponent');
		})
	}

	loadComponent(currentAddIndex: string) {

		let adItem = this.pages[currentAddIndex];
		let componentFactory = this._componentFactoryResolver.resolveComponentFactory(adItem.component);

		let viewContainerRef = this.pageHost.viewContainerRef;
		viewContainerRef.clear();

		let componentRef = viewContainerRef.createComponent(componentFactory);
		(<PageComponent>componentRef.instance).data = adItem.data;
	}


}


