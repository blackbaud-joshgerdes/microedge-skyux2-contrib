import { Component } from '@angular/core';

@Component({
  selector: 'sky-demo-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class SkyContribDemoNavComponent {
  public navItems: any[] = [
    {
      title: 'Home',
      url: '/',
      exact: true
    },
    {
      title: 'Components',
      url: '/components'
    }
  ];
}
