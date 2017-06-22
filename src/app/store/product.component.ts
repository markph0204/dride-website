import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productData: FirebaseListObservable<any[]>;

  constructor(db: AngularFireDatabase, private route: ActivatedRoute) {

		this.route.params.subscribe(params => {

		    this.productData = db.list('content/' + params['productSlug']);

		});

  }

  ngOnInit() {
  }

}
