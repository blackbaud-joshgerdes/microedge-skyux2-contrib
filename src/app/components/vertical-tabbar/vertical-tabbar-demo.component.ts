import { Component } from '@angular/core';

@Component({
  selector: 'sky-vertical-tabbar-demo',
  templateUrl: './vertical-tabbar-demo.component.html'
})
export class SkyContribVerticalTabbarDemoComponent {
  public itemClickedAction($e: any) {
    console.log($e.title, 'is now the active tab');
  }
}
