import {
  Component, Input, Output, EventEmitter, ContentChildren, QueryList, OnDestroy
} from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { SkyDraggableRepeaterItemComponent } from './draggable-repeater-item.component';

@Component({
    selector: 'sky-contrib-draggable-repeater',
    templateUrl: './draggable-repeater.component.html',
    styleUrls: ['./draggable-repeater.component.scss']
})
export class SkyDraggableRepeaterComponent implements OnDestroy {
  @Input() dragOnHandle: boolean = false;
  @Output() onItemsReordered = new EventEmitter<any>();
  @ContentChildren(SkyDraggableRepeaterItemComponent)
    items: QueryList<SkyDraggableRepeaterItemComponent>;
  bagName: string = this.generateGuid();
  private subscriptions: any[] = [];

  constructor(private dragulaService: DragulaService) {
    dragulaService.setOptions(this.bagName, {
      moves: (el: any, source: any, handle: any, sibling: any) =>
        !this.dragOnHandle ||
        handle.classList.contains('sky-contrib-draggable-repeater-item-drag-handle') ||
        handle.classList.contains('sky-contrib-draggable-repeater-item-drag-handle-icon')
    });

    this.subscriptions.push(dragulaService.drop.subscribe(([e, element, container]: any[]) => {
      let itemIds: any[] = [];
      let nodes = container.getElementsByTagName('sky-contrib-draggable-repeater-item');
      for (let i = 0; i < nodes.length; i++) {
        let el = nodes[i];
        let idString = el.getAttribute('repeater-item-id');

        // look up the actual item so we don't force consumers to deal with string-based IDs only
        let matchingItem = this.items.filter(x => x.id.toString() === idString);
        if (matchingItem.length > 0) {
          itemIds.push(matchingItem[0].id);
        }
      }

      this.onItemsReordered.emit(itemIds);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private generateGuid() {
    function s4() {
       return Math.floor((1 + Math.random()) * 0x10000)
         .toString(16)
         .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
       s4() + '-' + s4() + s4() + s4();
  }
}
