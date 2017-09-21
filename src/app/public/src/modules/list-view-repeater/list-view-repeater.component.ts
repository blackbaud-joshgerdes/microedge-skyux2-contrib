import {
  Component,
  Input,
  ContentChild,
  forwardRef,
  ChangeDetectionStrategy,
  TemplateRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ListViewComponent } from '../list/list-view.component';
import { ListState, ListStateDispatcher } from '../list/state';
import { ListItemModel } from '../list/state/items/item.model';
import {
  RepeaterState,
  RepeaterStateDispatcher,
  RepeaterStateModel
} from './state';
import {
  ListViewRepeaterSetExpandedAction
} from './state/expanded/actions';
import {
  SkyContribListViewRepeaterLeftComponent
} from './list-view-repeater-left.component';
import {
  SkyContribListViewRepeaterRightComponent
} from './list-view-repeater-right.component';
import {
  SkyContribListViewRepeaterTitleComponent
} from './list-view-repeater-title.component';
import {
  SkyContribListViewRepeaterDescriptionComponent
} from './list-view-repeater-description.component';
import {
  SkyContribListViewRepeaterContentComponent
} from './list-view-repeater-content.component';

@Component({
  selector: 'sky-contrib-list-view-repeater',
  templateUrl: './list-view-repeater.component.html',
  styleUrls: ['./list-view-repeater.component.scss'],
  providers: [
    /* tslint:disable */
    { provide: ListViewComponent, useExisting: forwardRef(() => SkyContribListViewRepeaterComponent)},
    /* tslint:enable */
    RepeaterState,
    RepeaterStateDispatcher,
    RepeaterStateModel
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyContribListViewRepeaterComponent extends ListViewComponent {
  @Input() set name(value: string) { this.viewName = value; }
  @Input() public displayContent = true;
  /* tslint:disable */
  @Input('search') public searchFunction: (data: any, searchText: string) => boolean;
  /* tslint:enable */
  @ContentChild(SkyContribListViewRepeaterLeftComponent)
    public leftComponent: SkyContribListViewRepeaterLeftComponent;
  @ContentChild(SkyContribListViewRepeaterRightComponent)
    public rightComponent: SkyContribListViewRepeaterRightComponent;
  @ContentChild(SkyContribListViewRepeaterTitleComponent)
    public titleComponent: SkyContribListViewRepeaterTitleComponent;
  @ContentChild(SkyContribListViewRepeaterDescriptionComponent)
    public descriptionComponent: SkyContribListViewRepeaterDescriptionComponent;
  @ContentChild(SkyContribListViewRepeaterContentComponent)
    public contentComponent: SkyContribListViewRepeaterContentComponent;

  constructor(
    state: ListState,
    private dispatcher: ListStateDispatcher,
    private repeaterState: RepeaterState,
    private repeaterDispatcher: RepeaterStateDispatcher
  ) {
    super(state, 'Repeater View');
  }

  public onViewActive() {
    if (this.searchFunction !== undefined) {
      this.dispatcher.searchSetFunctions([this.searchFunction]);
    }
    this.dispatcher.searchSetFieldSelectors([]);
  }

  public toggleContent(item: ListItemModel) {
    this.repeaterState.map(s => s.expanded)
      .take(1)
      .subscribe(expanded => {
        this.repeaterDispatcher.next(
          new ListViewRepeaterSetExpandedAction(item.id, !expanded[item.id])
        );
      });
  }

  public showContent(item: ListItemModel) {
    return this.repeaterState.map(s => s.expanded[item.id]);
  }

  public trackByItemId(index: number, item: ListItemModel): string {
    return item.id;
  }

  get items(): Observable<Array<ListItemModel>> {
    return this.state.map(s => s.items.items);
  }

  private get loading(): Observable<boolean> {
    return this.state.map(s => s.items.loading)
      .distinctUntilChanged();
  }

  get leftTemplate(): TemplateRef<any> {
    return this.leftComponent !== undefined ? this.leftComponent.template : undefined;
  }

  get rightTemplate(): TemplateRef<any> {
    return this.rightComponent !== undefined ? this.rightComponent.template : undefined;
  }

  get titleTemplate(): TemplateRef<any> {
    return this.titleComponent !== undefined ? this.titleComponent.template : undefined;
  }

  get descriptionTemplate(): TemplateRef<any> {
    return this.descriptionComponent !== undefined ? this.descriptionComponent.template : undefined;
  }

  get contentTemplate(): TemplateRef<any> {
    return this.contentComponent !== undefined ? this.contentComponent.template : undefined;
  }
}
