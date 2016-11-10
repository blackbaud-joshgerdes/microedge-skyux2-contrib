import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  ListState,
  ListStateDispatcher
} from '../list/state';
import * as moment from 'moment';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { ListViewsLoadAction } from '../list/state/views/actions';
import { ListViewModel } from '../list/state/views/view.model';
import { ListItemModel } from '../list/state/items/item.model';
import { ListItemsLoadAction } from '../list/state/items/actions';
import { ListDisplayedItemsLoadAction } from '../list/state/displayed-items/actions';
import { ListTestComponent } from './fixtures/list.component.fixture';
import { ListAsyncTestComponent } from './fixtures/list-async.component.fixture';
import { ListEmptyTestComponent } from './fixtures/list-empty.component.fixture';
import { SkyListComponent, SkyListModule } from './';
import { SkyListToolbarModule } from '../list-toolbar';
import { SkyListViewGridModule, SkyListViewGridComponent } from '../list-view-grid';
import { SkyListFiltersModule } from '../list-filters';

describe('List Component', () => {
  describe('List Fixture', () => {
    describe('List Component with Observable', () => {
      let state: ListState,
          dispatcher: ListStateDispatcher,
          component: ListTestComponent,
          fixture: any,
          nativeElement: HTMLElement,
          element: DebugElement,
          items: Observable<any>,
          bs: BehaviorSubject<any>;

      beforeEach(async(() => {
        dispatcher = new ListStateDispatcher();
        state = new ListState(dispatcher);

        let itemsArray = [
          { id: '1', column1: '30', column2: 'Apple', column3: 1, column4: moment().add(1, 'minute') },
          { id: '2', column1: '01', column2: 'Banana', column3: 3, column4: moment().add(6, 'minute') },
          { id: '3', column1: '11', column2: 'Banana', column3: 11, column4: moment().add(4, 'minute') },
          { id: '4', column1: '12', column2: 'Carrot', column3: 12, column4: moment().add(2, 'minute') },
          { id: '5', column1: '12', column2: 'Edamame', column3: 12, column4: moment().add(5, 'minute') },
          { id: '6', column1: null, column2: null, column3: 20, column4: moment().add(3, 'minute') },
          { id: '7', column1: '22', column2: 'Grape', column3: 21, column4: moment().add(7, 'minute') }
        ];

        bs = new BehaviorSubject<Array<any>>(itemsArray);
        items = bs.asObservable();

        TestBed.configureTestingModule({
          declarations: [
            ListTestComponent
          ],
          imports: [
            SkyListModule,
            SkyListFiltersModule,
            SkyListToolbarModule,
            SkyListViewGridModule,
            FormsModule
          ],
          providers: [
            { provide: 'items', useValue: items }
          ]
        })
        .overrideComponent(SkyListComponent, {
          set: {
            providers: [
              { provide: ListState, useValue: state },
              { provide: ListStateDispatcher, useValue: dispatcher }
            ]
          }
        });

        fixture = TestBed.createComponent(ListTestComponent);
        nativeElement = fixture.nativeElement as HTMLElement;
        element = fixture.debugElement as DebugElement;
        component = fixture.componentInstance;
        fixture.detectChanges();

        // always skip the first update to ListState, when state is ready
        // run detectChanges once more then begin tests
        state.skip(1).take(1).subscribe(() => fixture.detectChanges());
        fixture.detectChanges();
      }));

      function setSearchInput(text: string) {
        let searchInputElement = element.query(By.css('.toolbar-item-container input[type="text"]')).nativeElement;
        searchInputElement.value = text;
        searchInputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        return fixture.whenStable();
      }

      function setFilterSelect(text: string, modal: boolean = false) {
        let filterSelect = modal ? document.querySelector('.sky-list-filters-modal-bar select') : element.query(By.css('.sky-list-filters-inline-bar select')).nativeElement;
        filterSelect.value = text;
        filterSelect.dispatchEvent(new Event('change'));
        fixture.detectChanges();
        return fixture.whenStable();
      }

      it('should load data', () => {
        expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(7);
      });

      it('should load new data', () => {
        expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(7);
        fixture.detectChanges();
        bs.next([
          { id: '1', column1: '1', column2: 'Large', column3: 2, column4: moment().add(15, 'minute') },
          { id: '2', column1: '22', column2: 'Small', column3: 3, column4: moment().add(60, 'minute') },
          { id: '3', column1: '33', column2: 'Medium', column3: 4, column4: moment().add(45, 'minute') }
        ]);
        fixture.detectChanges();
        expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(3);
      });

      it('should update displayed items when data is updated', () => {
        let newItems = [
          { id: '11', column1: '11', column2: 'Coffee', column3: 11, column4: moment().add(11, 'minute') },
          { id: '12', column1: '12', column2: 'Tea', column3: 12, column4: moment().add(12, 'minute') }
        ];

        bs.next(newItems);
        fixture.detectChanges();

        expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(2);
      });

      it('should search based on input text', async(() => {
        setSearchInput('banana')
        .then(() => {
          fixture.detectChanges();
          element.query(By.css('button[cmp-id="search"] i')).triggerEventHandler('click', null);
          fixture.detectChanges();
          expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(2);
        });
      }));

      it('should sort', () => {
        expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(7);
        element.query(By.css('th.heading')).triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(element.query(By.css('sky-list-view-grid-cell[cmp-id="column1"]')).nativeElement.textContent.trim()).toBe('');
        fixture.detectChanges();
        element.query(By.css('th.heading')).triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(element.query(By.css('sky-list-view-grid-cell[cmp-id="column1"]')).nativeElement.textContent.trim()).toBe('01');
        fixture.detectChanges();
        element.queryAll(By.css('th.heading'))[2].triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(element.query(By.css('sky-list-view-grid-cell[cmp-id=".column3"]')).nativeElement.textContent.trim()).toBe('21');
      });

      it('should sort based on column using cached search', async(() => {
        setSearchInput('banana')
        .then(() => {
          fixture.detectChanges();
          element.query(By.css('button[cmp-id="search"] i')).triggerEventHandler('click', null);
          fixture.detectChanges();
          expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(2);
          expect(element.query(By.css('sky-list-view-grid-cell[cmp-id="column1"]')).nativeElement.textContent.trim()).toBe('01');

          element.query(By.css('th.heading')).triggerEventHandler('click', null);
          fixture.detectChanges();
          expect(element.query(By.css('sky-list-view-grid-cell[cmp-id="column1"]')).nativeElement.textContent.trim()).toBe('11');
        });
      }));

      it('should filter based on defined filter', async(() => {
        fixture.detectChanges();
        element.query(By.css('button[cmp-id="filter"]')).triggerEventHandler('click', null);
        fixture.detectChanges();
        setFilterSelect('banana').then(() => {
          expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(2);
          fixture.detectChanges();
          setFilterSelect('apple').then(() => {
            expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(1);
          });
        });
      }));

      it('should filter using cached filter', async(() => {
        fixture.detectChanges();
        element.query(By.css('button[cmp-id="filter"]')).triggerEventHandler('click', null);
        fixture.detectChanges();
        setFilterSelect('banana').then(() => {
          expect(element.query(By.css('sky-list-view-grid-cell[cmp-id="column1"]')).nativeElement.textContent.trim()).toBe("01");

          element.query(By.css('th.heading')).triggerEventHandler('click', null);
          fixture.detectChanges();
          expect(element.query(By.css('sky-list-view-grid-cell[cmp-id="column1"]')).nativeElement.textContent.trim()).toBe("11");
        });
      }));

      it('should filter using modal then clear active filter', async(() => {
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          element.query(By.css('button[cmp-id="filter"]')).triggerEventHandler('click', null);
          fixture.detectChanges();
          element.query(By.css('.sky-list-filters-inline-bar button[cmp-id="filter-show-more"]')).triggerEventHandler('click', null);
          fixture.detectChanges();
          document.querySelector('sky-modal-footer button[cmp-id="clear-filters"]').dispatchEvent(new Event('click'));
          fixture.detectChanges();

          return fixture.whenStable();
        })
        .then(() => setFilterSelect('banana', true))
        .then(() => {
            document.querySelector('sky-modal-footer button[cmp-id="apply-filters"]').dispatchEvent(new Event('click'));
            fixture.detectChanges();

            expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(2);
            expect(element.query(By.css('.sky-list-filters-modal-active span.filter-button')).nativeElement.textContent.trim()).toBe('banana');
            expect(element.query(By.css('sky-list-view-grid-cell[cmp-id="column1"]')).nativeElement.textContent.trim()).toBe('01');
            expect(element.query(By.css('sky-list-view-grid-cell[cmp-id="column2"]')).nativeElement.textContent.trim()).toBe('Banana');

            document.querySelector('.sky-list-filters-modal-active span.filter-button i').dispatchEvent(new Event('click'));
            fixture.detectChanges();

            expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(7);
            expect(element.queryAll(By.css('.sky-list-filters-modal-active')).length).toBe(0);
        });
      }));

      describe('itemCount', () => {
        it('should return count', async(() => {
          component.list.itemCount.subscribe(c => {
            expect(c).toBe(7);
          });
        }));
      });

      describe('lastUpdate', () => {
        it('should return last updated date', async(() => {
          component.list.lastUpdate.take(1).subscribe(u => {
            state.take(1).subscribe((s) => {
              expect(moment(u).isSame(s.items.lastUpdate)).toBeTruthy();
            });
          });
        }));

        it('should return undefined if not defined', async(() => {
          state.map((s) => s.items.lastUpdate = undefined).take(1).subscribe();
          component.list.lastUpdate.take(1).subscribe((u) => {
            expect(u).toBeUndefined();
          });
        }));
      });

      describe('views', () => {
        it('should return list of views', () => {
          expect(component.list.views.length).toBe(1);
          expect(component.list.views[0] instanceof SkyListViewGridComponent).toBeTruthy();
          expect(component.list.views[0].label).toBe('Grid View');
        });
      });
    });

    describe('List Component with Array', () => {
      let state: ListState,
          dispatcher: ListStateDispatcher,
          component: ListTestComponent,
          fixture: any,
          nativeElement: HTMLElement,
          element: DebugElement;

      beforeEach(async(() => {
        dispatcher = new ListStateDispatcher();
        state = new ListState(dispatcher);

        let items = [
          { id: '1', column1: '1', column2: 'Apple', column3: 1, column4: moment().add(1, 'minute') },
          { id: '2', column1: '01', column2: 'Banana', column3: 1, column4: moment().add(6, 'minute') },
          { id: '3', column1: '11', column2: 'Carrot', column3: 11, column4: moment().add(4, 'minute') },
          { id: '4', column1: '12', column2: 'Daikon', column3: 12, column4: moment().add(2, 'minute') },
          { id: '5', column1: '13', column2: 'Edamame', column3: 13, column4: moment().add(5, 'minute') },
          { id: '6', column1: '20', column2: 'Fig', column3: 20, column4: moment().add(3, 'minute') },
          { id: '7', column1: '21', column2: 'Grape', column3: 21, column4: moment().add(7, 'minute') }
        ];

        TestBed.configureTestingModule({
          declarations: [
            ListTestComponent
          ],
          imports: [
            SkyListModule,
            SkyListToolbarModule,
            SkyListViewGridModule,
            SkyListFiltersModule,
            FormsModule
          ],
          providers: [
            { provide: 'items', useValue: items }
          ]
        })
        .overrideComponent(SkyListComponent, {
          set: {
            providers: [
              { provide: ListState, useValue: state },
              { provide: ListStateDispatcher, useValue: dispatcher }
            ]
          }
        });

        fixture = TestBed.createComponent(ListTestComponent);
        nativeElement = fixture.nativeElement as HTMLElement;
        element = fixture.debugElement as DebugElement;
        component = fixture.componentInstance;
        fixture.detectChanges();

        // always skip the first update to ListState, when state is ready
        // run detectChanges once more then begin tests
        state.skip(1).take(1).subscribe(() => fixture.detectChanges());
        fixture.detectChanges();
      }));


      it('should load data', () => {
        expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(7);
      });
    });
  });

  describe('Async List Fixture', () => {
    describe('List Component with Observable', () => {
      let state: ListState,
          dispatcher: ListStateDispatcher,
          component: ListTestComponent,
          fixture: any,
          nativeElement: HTMLElement,
          element: DebugElement,
          items: Observable<any>,
          bs: BehaviorSubject<any>;

      beforeEach(async(() => {
        dispatcher = new ListStateDispatcher();
        state = new ListState(dispatcher);

        let itemsArray = [
          { id: '1', column1: '1', column2: 'Apple', column3: 1, column4: moment().add(1, 'minute') },
          { id: '2', column1: '01', column2: 'Banana', column3: 1, column4: moment().add(6, 'minute') }
        ];

        bs = new BehaviorSubject<Array<any>>(itemsArray);
        items = bs.asObservable();

        TestBed.configureTestingModule({
          declarations: [
            ListAsyncTestComponent
          ],
          imports: [
            SkyListModule,
            SkyListToolbarModule,
            SkyListViewGridModule,
            SkyListFiltersModule,
            FormsModule
          ],
          providers: [
            { provide: 'items', useValue: items }
          ]
        })
        .overrideComponent(SkyListComponent, {
          set: {
            providers: [
              { provide: ListState, useValue: state },
              { provide: ListStateDispatcher, useValue: dispatcher }
            ]
          }
        });

        fixture = TestBed.createComponent(ListAsyncTestComponent);
        nativeElement = fixture.nativeElement as HTMLElement;
        element = fixture.debugElement as DebugElement;
        component = fixture.componentInstance;
        fixture.detectChanges();

        // always skip the first update to ListState, when state is ready
        // run detectChanges once more then begin tests
        state.skip(1).take(1).subscribe(() => fixture.detectChanges());
        fixture.detectChanges();
      }));

      function setSearchInput(text: string) {
        let searchInputElement = element.query(By.css('.toolbar-item-container input[type="text"]')).nativeElement;
        searchInputElement.value = text;
        searchInputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        return fixture.whenStable();
      }

      it('should load array data', () => {
        expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(2);
      });

      it('should search based on input text', async(() => {
        setSearchInput('banana')
        .then(() => {
          fixture.detectChanges();
          element.query(By.css('button[cmp-id="search"] i')).triggerEventHandler('click', null);
          fixture.detectChanges();
          expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(3);
        });
      }));

      it('should sort search results', async(() => {
        setSearchInput('banana')
        .then(() => {
          fixture.detectChanges();
          element.query(By.css('button[cmp-id="search"] i')).triggerEventHandler('click', null);
          fixture.detectChanges();
          expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(3);

          element.query(By.css('th.heading')).triggerEventHandler('click', null);
          fixture.detectChanges();
          expect(element.query(By.css('sky-list-view-grid-cell[cmp-id="column1"]')).nativeElement.textContent.trim()).toBe("301");
        });
      }));

      it('should return last results based on same search', async(() => {
        setSearchInput('banana')
        .then(() => {
          fixture.detectChanges();
          element.query(By.css('button[cmp-id="search"] i')).triggerEventHandler('click', null);
          fixture.detectChanges();
          expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(3);

          setSearchInput('banana')
          .then(() => {
            fixture.detectChanges();
            element.query(By.css('button[cmp-id="search"] i')).triggerEventHandler('click', null);
            fixture.detectChanges();
            expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(3);
          });
        });
      }));

      it('should open filter modal when filter button clicked', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          element.query(By.css('button[cmp-id="filter"]')).triggerEventHandler('click', null);
          fixture.detectChanges();
          fixture.whenStable().then(() => {
              expect(element.queryAll(By.css('.sky-list-filters-inline-bar')).length).toBe(0);
              expect(document.querySelectorAll('.sky-modal').length).toBe(1);

              document.querySelector('button.sky-modal-btn-close').dispatchEvent(new Event('click'));
          });
        });
      }));

    });
  });

  describe('Empty List Fixture', () => {
    describe('List Component with Observable', () => {
      let state: ListState,
          dispatcher: ListStateDispatcher,
          component: ListTestComponent,
          fixture: any,
          nativeElement: HTMLElement,
          element: DebugElement,
          items: Observable<any>,
          bs: BehaviorSubject<any>;

      beforeEach(async(() => {
        dispatcher = new ListStateDispatcher();
        state = new ListState(dispatcher);

        let itemsArray = [
          { id: '1', column1: '1', column2: 'Apple', column3: 1, column4: moment().add(1, 'minute') },
          { id: '2', column1: '01', column2: 'Banana', column3: 1, column4: moment().add(6, 'minute') }
        ];

        bs = new BehaviorSubject<Array<any>>(itemsArray);
        items = bs.asObservable();

        TestBed.configureTestingModule({
          declarations: [
            ListEmptyTestComponent
          ],
          imports: [
            SkyListModule,
            SkyListToolbarModule,
            SkyListViewGridModule,
            SkyListFiltersModule,
            FormsModule
          ],
          providers: [
            { provide: 'items', useValue: items }
          ]
        })
        .overrideComponent(SkyListComponent, {
          set: {
            providers: [
              { provide: ListState, useValue: state },
              { provide: ListStateDispatcher, useValue: dispatcher }
            ]
          }
        });

        fixture = TestBed.createComponent(ListEmptyTestComponent);
        nativeElement = fixture.nativeElement as HTMLElement;
        element = fixture.debugElement as DebugElement;
        component = fixture.componentInstance;
        fixture.detectChanges();

        // always skip the first update to ListState, when state is ready
        // run detectChanges once more then begin tests
        state.skip(1).take(1).subscribe(() => fixture.detectChanges());
        fixture.detectChanges();
      }));

      function setSearchInput(text: string) {
        let searchInputElement = element.query(By.css('.toolbar-item-container input[type="text"]')).nativeElement;
        searchInputElement.value = text;
        searchInputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        return fixture.whenStable();
      }

      it('should be empty', () => {
        expect(element.queryAll(By.css('tr.sky-list-view-grid-row')).length).toBe(0);
      });
    });
  });
});
