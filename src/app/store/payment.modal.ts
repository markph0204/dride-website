import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: '../../assets/templates/modal/payment/modal.html',
  styleUrls: ['../../assets/templates/modal/payment/modal.scss']
})
export class NgbdModalPayement {
  @Input() name;
  qTitle: any;
  isLoaded: boolean = true;
  shareTxt: string = 'I just joined the waitlist for #dride. You should too! 🚗';
  constructor(public activeModal: NgbActiveModal,private router: Router, private route: ActivatedRoute) { 

  }


  closeModal = function () {
    this.activeModal.close();
  };


  dismissModal = function () {
    this.activeModal.dismiss();
  };



  tweet = function() {

      var urlString = 'https://www.twitter.com/intent/tweet?';
      urlString += 'text=' + encodeURIComponent(this.shareTxt);
      urlString += '&hashtags=' + encodeURIComponent('connected_dashcam');

      //default to the current page if a URL isn't specified
      urlString += '&url=' + encodeURIComponent('https://dride.io/store');

      window.open(
          urlString,
          'Twitter', 'toolbar=0,status=0,resizable=yes,width=500,height=600,top=' + (window.innerHeight - 600) / 2 + ',left=' + (window.innerWidth - 500) / 2);
      //$mixpanel.track('twitted from store');

  }


}