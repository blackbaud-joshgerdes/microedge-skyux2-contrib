import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  ListState,
  ListStateDispatcher,
  ListStateModel
} from '../list/state';
import { SkyListToolbarModule } from './';
import {
  ListToolbarTestComponent
} from './fixtures/list-toolbar.component.fixture';
import { BehaviorSubject, Subject } from 'rxjs';

describe('List Toolbar Component', () => {
  let state: ListState,
      dispatcher: ListStateDispatcher,
      fixture: any,
      element: any;

  beforeEach((done) => {
    dispatcher = new ListStateDispatcher();
    state = new ListState(new ListStateModel(), dispatcher);

    TestBed
      .configureTestingModule({
        declarations: [
          ListToolbarTestComponent
        ],
        imports: [
          SkyListToolbarModule
        ],
        providers: [
          { provide: ListState, useValue: state },
          { provide: ListStateDispatcher, useValue: dispatcher }
        ]
      })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ListToolbarTestComponent);
        element = fixture.nativeElement as HTMLElement;
        fixture.detectChanges();

        // always skip the first update to ListState, when state is ready
        // run detectChanges once more then begin tests
        state.skip(1).take(1).subscribe((s: any) => {
          fixture.detectChanges();
          done();
        });
      });
  });

  it('should add search by default', () => {
    expect(element.querySelector("[cmp-id='search']")).not.toBeNull();
  });
});
