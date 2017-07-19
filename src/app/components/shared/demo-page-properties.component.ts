import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'sky-demo-page-properties',
  templateUrl: './demo-page-properties.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyContribDemoPagePropertiesComponent {
  @Input()
  public sectionHeading = 'Properties';
}
