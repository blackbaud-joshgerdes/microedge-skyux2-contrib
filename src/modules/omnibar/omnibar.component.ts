import { Component, Input, Output, Inject, ElementRef, ViewChild, ContentChild, EventEmitter } from '@angular/core';
import { SkyOmnibarConfigModel } from './omnibar-config.model';
let scriptLoader = require('little-loader');

@Component({
  selector: 'sky-contrib-omnibar',
  template: require('./omnibar.component.html'),
  styles: [
    require('./omnibar.component.scss')
  ]
})
export class SkyOmnibarComponent {
  @Input() config: SkyOmnibarConfigModel;
  @Output() searchTextChanged = new EventEmitter();
  @Output() searchBoxKeyUp = new EventEmitter();
  searchText: string;

  @ViewChild('menu') private menu: any;
  @ViewChild('omnibar') private omnibar: any;
  private showMobile: boolean;
  private searchContainerRef: any;
  private searchBoxRef: any;

  constructor(@Inject('window') private window: any) {
  }

  ngAfterViewInit() {
    this.attachDeps(); // we won't use it but BBAUTH does :(

    scriptLoader(this.config.url, (err: any) => {
      let cmp = this;
      let options = Object.assign({}, this.config, {
        afterLoad: function () { cmp.afterLoad.apply(cmp, arguments); },
        userLoaded: function () { cmp.userLoaded.apply(cmp, arguments); },
        menuEl: this.wrapElement(this.menu.nativeElement)
      });

      this.window.BBAUTH.Omnibar.load(this.omnibar.nativeElement, options);
    });
  }

  setAsyncSearching(searching: boolean) {
    if (searching) {
      this.searchContainerRef.addClass('searching');
    } else {
      this.searchContainerRef.removeClass('searching');
    }
  }

  search(searchText: string) {
    this.searchText = searchText || '';
    if (this.searchText !== this.searchBoxRef.val()) {
      this.searchBoxRef.val(this.searchText);
      this.searchTextChanged.emit({ value: this.searchText });
    }
  }

  private afterLoad() {
    let omnibar = this.omnibar.nativeElement;
    this.searchBoxRef = omnibar.querySelector('.searchbox');
    this.searchContainerRef = omnibar.querySelector('.searchContainer');

    if (omnibar.querySelectorAll('.mobile .productmenucontainer').length === 0) {
      this.showMobile = true;
    }

    this.searchBoxRef.setAttribute('placeholder', this.config.searchPlaceholder);
    this.searchBoxRef.addEventListener('keyup', (event: any) => {
      if (event.defaultPrevented) {
        return;
      }

      let value = this.searchBoxRef.value;

      if (value !== this.searchText) {
        this.searchText = value;
        this.searchTextChanged.emit({ value: value });
      }

      this.searchBoxKeyUp.emit({ value: event.keyCode });
    });

    if (this.config.afterLoad != null) {
      this.config.afterLoad.apply(this, arguments);
    }
  }

  private userLoaded(userData: any) {
    if (userData.id !== this.config.authenticationUserId && this.config.signOutUrl) {
      if (userData.id === null) {
        if (window.localStorage) {
          // cast to any to avoid having to add TypeScript typings for localStorage
          // values we don't control from our applications
          let storage = window.localStorage as any;
          let omnibarIndicatesNullUserTime = storage.omnibarIndicatesNullUserTime;
          let nullUserTime = Date.parse(omnibarIndicatesNullUserTime);
          let currentTime = new Date().getTime();

          if (omnibarIndicatesNullUserTime && 10 >= currentTime - nullUserTime / 1000) {
            return;
          }

          try {
            storage.omnibarIndicatesNullUserTime = (new Date()).toString();
          } catch (e) {
            return;
          }
        } else {
          return;
        }
      }

      window.location.href = this.config.signOutUrl;
    }

    if (this.config.userLoaded != null) {
      this.config.userLoaded.apply(this, arguments);
    }
  }

  private attachDeps() {
    // dependencies of BBAUTH that it expects to be loaded in global scope (ew)
    require('madlib-shim-easyxdm');
    this.window.jQuery = this.window.$ = this.window.jQuery || require('jquery');
  }

  private wrapElement(element: any) {
    // Some BBAUTH code expects that it can call show on an element, so we make
    // a wrapper object that behaves that way
    return {
      show: () => element.style.display = 'block',
      hide: () => element.style.display = 'none'
    };
  }
}
