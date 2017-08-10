import { Component } from '@angular/core';

@Component({
  selector: 'sky-vertical-tabbar-demo',
  templateUrl: './vertical-tabbar-demo.component.html'
})
export class SkyContribVerticalTabbarDemoComponent {
  public tabs: Array<any> = [
    {
      name: 'Tab One',
      content: 'TAB ONE CONTENT',
      disabled: false,
      active: false
    },
    {
      name: 'Tab Two',
      content: 'TAB TWO CONTENT',
      disabled: false,
      active: true
    },
    {
      name: 'Tab Three',
      content: 'TAB THREE CONTENT',
      disabled: true,
      active: false
    },
    {
      name: 'Tab Four - A very long title that seems to go on forever',
      content: 'TAB FOUR CONTENT',
      disabled: false,
      active: false
    }
  ];

  public itemClickedAction($e: any) {
    console.log($e.title, 'is now the active tab');
  }
}
