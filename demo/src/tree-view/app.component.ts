import { Component, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MicroedgeSkyContribModule } from '../../../src/core';
import { Bootstrapper } from '../../bootstrapper';
import  { TreeNodeModel } from '../../../src/core';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './app.component.html'
})
class AppComponent {
  disableParents: boolean;
  leafOnlySelection: boolean;
  data: TreeNodeModel[] = [];
  data2: TreeNodeModel[] = [];

  constructor() {
    this.disableParents = true;
    this.leafOnlySelection = false;
    let root1node = new TreeNodeModel({id: 1, name: 'root1'});
    let child1node = new TreeNodeModel({ id: 2, name: 'child1', parent: root1node });
    child1node.children = [new TreeNodeModel({id: 2.1, name: 'sub-child1', parent: child1node})];
    let child2node = new TreeNodeModel({ id: 3, name: 'child2', parent: root1node });
    child2node.children = [new TreeNodeModel({id: 3.1, name: 'sub-child2', parent: child2node})];
    child2node.children[0].children =
      [new TreeNodeModel({id: 3.11, name: 'sub-sub-child1', parent: child2node.children[0]})];
    root1node.children =  [child1node, child2node];

    this.data.push(root1node);

    root1node = new TreeNodeModel({id: 1, name: 'root1'});
    child1node = new TreeNodeModel({ id: 2, name: 'child1', parent: root1node });
    child1node.children = [new TreeNodeModel({id: 2.1, name: 'sub-child1', parent: child1node})];
    child2node = new TreeNodeModel({ id: 3, name: 'child2', parent: root1node });
    child2node.children = [new TreeNodeModel({id: 3.1, name: 'sub-child2', parent: child2node})];
    child2node.children[0].children =
      [new TreeNodeModel({id: 3.11, name: 'sub-sub-child1', parent: child2node.children[0]})];
    root1node.children =  [child1node, child2node];

    this.data2.push(root1node);
  }
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    MicroedgeSkyContribModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
class AppModule { }

Bootstrapper.bootstrapModule(AppModule);
