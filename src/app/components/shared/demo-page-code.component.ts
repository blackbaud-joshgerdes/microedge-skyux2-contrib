import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

declare let Prism: any;
import 'prismjs/prism';
import 'prismjs/components/prism-typescript';

import { SkyContribDemoPageCodeFile } from './demo-page-code-file';
import { SkyContribDemoPagePlunkerService } from './demo-page-plunker-service';
import { SkyContribDemoComponentsService } from '../demo-components.service';

@Component({
  selector: 'sky-demo-page-code',
  templateUrl: './demo-page-code.component.html',
  styleUrls: ['./demo-page-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SkyContribDemoPagePlunkerService]
})
export class SkyContribDemoPageCodeComponent {
  @Input()
  public codeFilesForBinding: SkyContribDemoPageCodeFile[];

  @Input()
  public set demoName(value: string) {

    let items = this.componentsService.getComponents().find((item) => {
      return item.name === value;
    });

    this.codeFilesForBinding = items.getCodeFiles().map((item) => {
      return new SkyContribDemoPageCodeFile(
        item.name,
        item.fileContents,
        item.componentName,
        item.bootstrapSelector
      );
    });
  }

  public get plunkerFiles(): any[] {
    return [
      ...this.plunkerService.getFiles(this.codeFilesForBinding)
    ];
  }

  constructor(
    private plunkerService: SkyContribDemoPagePlunkerService,
    private componentsService: SkyContribDemoComponentsService
  ) { }
}
