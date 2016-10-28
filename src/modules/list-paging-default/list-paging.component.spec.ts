import {
  ComponentFixture,
  TestBed,
  async,
  DebugElement
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  ListState,
  ListStateDispatcher,
  ListStateModel
} from '../list/state';
import { ListItemModel } from '../list/state/items/item.model';
import { ListItemsLoadAction } from '../list/state/items/actions';
import { SkyListPagingDefaultModule } from './';
import { ListPagingDefaultTestComponent } from './fixtures/list-paging-default.component.fixture';
import { BehaviorSubject, Subject } from 'rxjs';

describe('List Paging Component', () => {
  let state: ListState,
      dispatcher: ListStateDispatcher,
      fixture: any,
      nativeElement: HTMLElement,
      element: DebugElement;

  beforeEach(async(() => {
    dispatcher = new ListStateDispatcher();
    state = new ListState(new ListStateModel(), dispatcher);

    TestBed.configureTestingModule({
      declarations: [
        ListPagingDefaultTestComponent
      ],
      imports: [
        SkyListPagingDefaultModule
      ],
      providers: [
        { provide: ListState, useValue: state },
        { provide: ListStateDispatcher, useValue: dispatcher }
      ]
    });

    fixture = TestBed.createComponent(ListPagingDefaultTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    element = fixture.debugElement as DebugElement;
    fixture.detectChanges();

    // always skip the first update to ListState, when state is ready
    // run detectChanges once more then begin tests
    state.skip(1).take(1).subscribe(() => fixture.detectChanges());
  }));

  describe('with 8 items', () => {
    beforeEach(async(() => {
      // add some base items to be paged
      dispatcher.next(new ListItemsLoadAction([
        new ListItemModel('1', false, {}),
        new ListItemModel('2', false, {}),
        new ListItemModel('3', false, {}),
        new ListItemModel('4', false, {}),
        new ListItemModel('5', false, {}),
        new ListItemModel('6', false, {}),
        new ListItemModel('7', false, {})
      ], true));

      fixture.detectChanges();
    }));

    it('should show 3 pages', () => {
      expect(element.queryAll(By.css('.sky-list-paging-link')).length).toBe(3);
    });

    it('should have a disabled previous button', () => {
      expect(element.query(By.css('.sky-paging-caret[cmp-id="previous"]')).nativeElement.classList.contains('disabled')).toBe(true);
    });

    it('should have an enabled next button', () => {
      expect(element.query(By.css('.sky-paging-caret[cmp-id="next"]')).nativeElement.classList.contains('disabled')).toBe(false);
    });

    it('should show selected page (1) with a special style', () => {
      expect(element.query(By.css('.sky-list-paging-link[cmp-id="1"] a')).nativeElement.classList.contains('current')).toBe(true);
    });

    describe('after clicking page 3', () => {
      beforeEach(async(() => {
        element.query(By.css('.sky-list-paging-link[cmp-id="3"] a')).triggerEventHandler('click', null);
        fixture.detectChanges();
      }));

      it('should have a enabled previous button', () => {
        expect(element.query(By.css('.sky-paging-caret[cmp-id="previous"]')).nativeElement.classList.contains('disabled')).toBe(false);
      });

      it('should have an enabled next button', () => {
        expect(element.query(By.css('.sky-paging-caret[cmp-id="next"]')).nativeElement.classList.contains('disabled')).toBe(false);
      });

      it('should show selected page (3) with a special style', () => {
        expect(element.query(By.css('.sky-list-paging-link[cmp-id="3"] a')).nativeElement.classList.contains('current')).toBe(true);
      });

      it('should not show page (1)', () => {
        expect(element.query(By.css('.sky-list-paging-link[cmp-id="1"]'))).toBeNull();
      });

      it('should show page (4)', () => {
        expect(element.query(By.css('.sky-list-paging-link[cmp-id="4"]'))).not.toBeNull();
      });

      describe('and clicking next', () => {
        beforeEach(async(() => {
          element.query(By.css('.sky-paging-caret[cmp-id="next"]')).triggerEventHandler('click', null);
          fixture.detectChanges();
        }));

        it('should have a enabled previous button', () => {
          expect(element.query(By.css('.sky-paging-caret[cmp-id="previous"]')).nativeElement.classList.contains('disabled')).toBe(false);
        });

        it('should have a disabled next button', () => {
          expect(element.query(By.css('.sky-paging-caret[cmp-id="next"]')).nativeElement.classList.contains('disabled')).toBe(true);
        });
      });

      describe('and clicking previous twice', () => {
        beforeEach(async(() => {
          element.query(By.css('.sky-paging-caret[cmp-id="previous"]')).triggerEventHandler('click', null);
          element.query(By.css('.sky-paging-caret[cmp-id="previous"]')).triggerEventHandler('click', null);
          fixture.detectChanges();
        }));

        it('should have a disabled previous button', () => {
          expect(element.query(By.css('.sky-paging-caret[cmp-id="previous"]')).nativeElement.classList.contains('disabled')).toBe(true);
        });

        it('should have an enabled next button', () => {
          expect(element.query(By.css('.sky-paging-caret[cmp-id="next"]')).nativeElement.classList.contains('disabled')).toBe(false);
        });

        it('should show selected page (1) with a special style', () => {
          expect(element.query(By.css('.sky-list-paging-link[cmp-id="1"] a')).nativeElement.classList.contains('current')).toBe(true);
        });
      });
    });
  });
});