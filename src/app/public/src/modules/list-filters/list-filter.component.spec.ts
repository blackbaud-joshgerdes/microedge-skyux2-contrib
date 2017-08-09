import {
  TestBed,
  async
} from '@angular/core/testing';
import { SkyContribListFiltersModule } from './';
import {
  ListFilterEmptyTestComponent
} from './fixtures/list-filter-empty.component.fixture';

describe('List Filter Component', () => {
  let fixture: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListFilterEmptyTestComponent
      ],
      imports: [
        SkyContribListFiltersModule
      ]
    });
  }));

  describe('Empty Fixture', () => {
    it('should throw error if name not defined', () => {
        expect(() => {
          fixture = TestBed.createComponent(ListFilterEmptyTestComponent);
          fixture.detectChanges();
        }).toThrow(new Error('Sky List Filter requires a name.'));
    });
  });
});
