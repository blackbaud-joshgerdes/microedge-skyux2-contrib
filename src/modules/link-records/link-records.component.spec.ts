import { DebugElement } from '@angular/core';
import {
  TestBed,
  async
} from '@angular/core/testing';
import { ScalarObservable } from 'rxjs/observable/ScalarObservable';
import { By } from '@angular/platform-browser';
import { SkyContribLinkRecordsModule } from './';
import {
  SkyLinkRecordsDefaultTemplatesTestComponent
} from './fixtures/link-records.component.defaultTemplates.fixture';
import {
  SkyLinkRecordsChildTemplatesTestComponent
} from './fixtures/link-records.component.childTemplates.fixture';
import {
  SkyLinkRecordsExternalTemplatesTestComponent
} from './fixtures/link-records.component.externalTemplatesNoItems.fixture';

describe('Link Records Component ', () => {
  let fixture: any,
      element: DebugElement,
      component: any,
      items: ScalarObservable<any>;

  describe('Default Templates Fixture', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          SkyLinkRecordsDefaultTemplatesTestComponent
        ],
        imports: [
          SkyContribLinkRecordsModule
        ]
      });

      fixture = TestBed.createComponent(SkyLinkRecordsDefaultTemplatesTestComponent);
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance as SkyLinkRecordsDefaultTemplatesTestComponent;
      items = component.items as any;
      fixture.detectChanges();
    }));

    it('should have items in the template', () => {
      const elementItems = element.children[0].children.filter(
        (item) => { return item.name === 'sky-contrib-link-records-item'; });

      expect(items.value.length).toEqual(elementItems.length);
      // test the results setter returns all valid matches (all matches are valid at this point)
      /* TODO expect(element.children[0].componentInstance.results.source.source.value.length)
        .toBe(element.children[0].componentInstance.matches.value.length); */
    });

    it('should update status when creating/removing a new record', () => {
      let noMatchAction = element.children[0].children[1].query(
        By.css('.link-records-item-match > .link-records-item-footer > .sky-btn-link')
      );

      // we're building this test on a specific data set
      expect(element.children[0].children[1].componentInstance.record.status)
        .toEqual('no_match');
      noMatchAction.triggerEventHandler('click', undefined);
      fixture.detectChanges();
      expect(element.children[0].children[1].componentInstance.record.status)
        .toEqual('created');

      noMatchAction = element.children[0].children[1].query(
        By.css('.link-records-item-match > .link-records-item-footer > .sky-btn-link')
      );
      noMatchAction.triggerEventHandler('click', undefined);
      fixture.detectChanges();
      expect( element.children[0].children[1].componentInstance.record.status)
        .toEqual('no_match');
    });

    it('should update status when cancelling/starting an edit', () => {
      // cancel first
      let actionButton = element.children[0].children[0].query(
        By.css('.link-records-item-match > .link-records-item-footer > .sky-btn-link'));

      // we're building this test on a specific data set
      expect(element.children[0].children[0].componentInstance.record.status)
        .toEqual('edit');
      actionButton.triggerEventHandler('click', undefined);
      fixture.detectChanges();
      expect(element.children[0].children[0].componentInstance.record.status)
        .toEqual('suggested');

      actionButton = element.children[0].children[0].query(
       By.css('.link-records-item-match > .link-records-item-footer > .sky-btn-primary'));
       actionButton.triggerEventHandler('click', undefined);
      fixture.detectChanges();
      expect(element.children[0].children[0].componentInstance.record.status)
        .toEqual('linked');
    });

    it('exposed function should let you add an item to change status', () => {
      expect(element.children[0].children[1].componentInstance.record.status).toEqual('no_match');
      element.children[0].children[1].children[1].children[2]
        .children[1].componentInstance.api.addSelectedItem('2',
        { id: '4', address: 444, name: 'Tomato', description: 'Tommy eats tomatoes.'});
      fixture.detectChanges();
      expect(element.children[0].children[1].componentInstance.record.status).toEqual('selected');
    });
  });

  describe('Child Templates Fixture', () => {
    beforeEach(async(() => {
      TestBed.resetTestingModule();

      TestBed.configureTestingModule({
        declarations: [
          SkyLinkRecordsChildTemplatesTestComponent
        ],
        imports: [
          SkyContribLinkRecordsModule
        ]
      });

      fixture = TestBed.createComponent(SkyLinkRecordsChildTemplatesTestComponent);
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance as SkyLinkRecordsChildTemplatesTestComponent;
      items = component.items as ScalarObservable<any>;
      fixture.detectChanges();
    }));

    it('should have the passed in template text for title', () => {
      expect(element.children[0].children[0].children[1]
        .children[0].children[0].children[0].nativeNode.innerText).toEqual('Applicant');
    });
  });

  describe('External Templates Fixture', () => {
    beforeEach(async(() => {
      TestBed.resetTestingModule();

      TestBed.configureTestingModule({
        declarations: [
          SkyLinkRecordsExternalTemplatesTestComponent
        ],
        imports: [
          SkyContribLinkRecordsModule
        ]
      });

      fixture = TestBed.createComponent(SkyLinkRecordsExternalTemplatesTestComponent);
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance as SkyLinkRecordsExternalTemplatesTestComponent;
      items = component.items as ScalarObservable<any>;
      fixture.detectChanges();
    }));

    it('should not have any items', () => {
      const elementItems = element.children[0].children.filter(
        (item) => { return item.name === 'sky-contrib-link-records-item-content'; });
      expect(elementItems.length).toEqual(1);
      expect(elementItems[0].children.length).toEqual(0);
    });
  });

});
