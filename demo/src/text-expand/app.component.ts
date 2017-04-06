import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Observable, BehaviorSubject } from 'rxjs';

import { MicroedgeSkyContribModule } from '../../../src/core';
import { ListItemModel } from '../../../src/modules/list/state/items/item.model';

import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './app.component.html'
})
class AppComponent {
  public content: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sollicitudin nunc nulla, ac vulputate nunc posuere nec. In molestie ex sed bibendum blandit. Aliquam a est magna. Etiam tristique sem urna, vitae laoreet neque bibendum id. Morbi placerat eget turpis eu tincidunt. Nulla tortor dui, iaculis vitae quam sit amet, efficitur dignissim est. Praesent commodo dapibus nibh, et ultrices mauris ornare eget. Sed molestie purus tortor, at faucibus justo porta nec. Curabitur velit diam, mollis ac dui vel, laoreet lobortis dolor. Suspendisse potenti. Vivamus purus tortor, tempor vel sem ut, feugiat hendrerit sem. Vestibulum a laoreet dolor. Duis id arcu consectetur, vehicula enim vitae, egestas dui. Maecenas eu odio eget nunc efficitur dictum ac varius ante. Sed sollicitudin sapien in turpis pretium euismod. Maecenas consequat laoreet tortor, quis suscipit sapien accumsan eu. Morbi posuere gravida hendrerit. Quisque eu tempor velit. Curabitur id est aliquam quam pulvinar interdum sit amet vehicula odio. Donec pellentesque venenatis est vitae auctor. Donec et posuere urna. Phasellus rhoncus nibh at purus rhoncus, ac lobortis est auctor. Fusce tincidunt nibh non quam accumsan, vitae imperdiet mi congue. Mauris magna lacus, congue ac odio sit amet, scelerisque auctor erat. Integer ac leo eu erat porta iaculis. Quisque et tempor neque. Nulla at bibendum diam. Quisque nisi dui, ullamcorper id libero ac, porttitor blandit leo. Nullam sit amet semper purus. Vivamus aliquet tellus posuere, lobortis nibh in, venenatis ligula. Proin malesuada massa eu ultrices rutrum. Mauris auctor aliquet odio in aliquet. Proin aliquam vitae nisi in pellentesque. Proin eleifend venenatis velit, quis placerat libero congue a. In imperdiet, metus eget ultricies facilisis, quam metus ornare augue, eu efficitur nulla tortor nec leo. Nam tristique, elit fermentum pharetra ornare, leo purus suscipit arcu, nec condimentum nisi odio sed leo. Donec pretium, dui in tincidunt egestas, risus nunc viverra turpis, quis sagittis orci libero vel magna. Etiam commodo dolor eget ante gravida, vel ultricies nisi faucibus. Curabitur massa libero, commodo nec consequat at, scelerisque at libero. Etiam ut turpis non risus dapibus feugiat ut non neque. Mauris facilisis lobortis tellus vel elementum. Ut vulputate ac neque in condimentum.";
}

@NgModule({
  imports: [
    BrowserModule,
    MicroedgeSkyContribModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
class AppModule { }

Bootstrapper.bootstrapModule(AppModule);
