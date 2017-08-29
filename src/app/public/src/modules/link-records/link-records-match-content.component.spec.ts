import { DebugElement } from '@angular/core';
import {
  TestBed,
  async
} from '@angular/core/testing';
import { SkyContribLinkRecordsModule } from './';
import {
  SkyLinkRecordsMatchContentInputTemplateTestComponent
} from './fixtures/link-records-match-content.component.input-template.fixture';
import {
  SkyLinkRecordsMatchContentContentChildrenTestComponent
} from './fixtures/link-records-match-content.component.content-children.fixture';

describe('Component: SkyContribLinkRecordsMatchContentComponent', () => {
  let fixture: any,
    element: DebugElement;

  describe('Fixture: inputTemplate', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          SkyLinkRecordsMatchContentInputTemplateTestComponent
        ],
        imports: [
          SkyContribLinkRecordsModule
        ]
      });

      fixture = TestBed.createComponent(SkyLinkRecordsMatchContentInputTemplateTestComponent);
      element = fixture.debugElement as DebugElement;
    }));

    it('template setter defines inputTemplate for content', () => {
      fixture.detectChanges();
      let elementItems = element.children[0].children.filter(
        (item) => { return item.name === 'sky-contrib-link-records-match-content'; });
      let component = elementItems[0].componentInstance;

      expect(component.template).toBeDefined();
    });
  });

  describe('Fixture: contentChildren', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          SkyLinkRecordsMatchContentContentChildrenTestComponent
        ],
        imports: [
          SkyContribLinkRecordsModule
        ]
      });

      fixture = TestBed.createComponent(SkyLinkRecordsMatchContentContentChildrenTestComponent);
      element = fixture.debugElement as DebugElement;
    }));

    it('content children defines template for content', () => {
      fixture.detectChanges();
      let elementItems = element.children[0].children.filter(
        (item) => { return item.name === 'sky-contrib-link-records-match-content'; });
      let component = elementItems[0].componentInstance;

      expect(component.template).toBeDefined();
    });
  });
});
