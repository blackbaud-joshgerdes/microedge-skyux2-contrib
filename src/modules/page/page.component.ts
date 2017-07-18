import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sky-contrib-page',
  templateUrl: './page.component.html'
})
export class SkyContribPageComponent implements OnInit {
  @Input() isAuthorized: any;
  @Input() isLoading: any;

  constructor() {
  }

  ngOnInit() {
    this.isAuthorized = this.isAuthorized instanceof Observable ?
      this.isAuthorized : Observable.of(this.isAuthorized || true);
    this.isLoading = this.isLoading instanceof Observable ?
      this.isLoading : Observable.of(this.isLoading || false);
  }
}
