import {
  TestBed,
  async
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { SkyTreeViewComponent } from './tree-view.component';
import { TreeNodeModel } from './tree-node.model';
import { TreeViewFixturesModule } from './fixtures/tree-view-fixtures.module';
import { TreeViewDefaultTestComponent } from
  './fixtures/tree-view-default.component.fixture';
import { TreeViewNoDataTestComponent } from
  './fixtures/tree-view-no-data.component.fixture';
import { TreeViewTemplatedTestComponent } from
  './fixtures/tree-view-templated.component.fixture';
import { TreeViewCheckboxesTestComponent } from
  './fixtures/tree-view-checkboxes.component.fixture';

describe('Tree view component', () => {

  describe('Populated Fixture', () => {
    let component: TreeViewDefaultTestComponent,
        fixture: any,
        nativeElement: HTMLElement,
        element: DebugElement,
        tree: SkyTreeViewComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          TreeViewFixturesModule
        ]
      });

      fixture = TestBed.createComponent(TreeViewDefaultTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance;
      tree = component.tree;
      fixture.detectChanges();
    }));

    it('should show no checkboxes by default', () => {
      let checkboxes = document.querySelectorAll('.sky-checkbox');
      expect(checkboxes.length).toBe(0);
    });

    it('should initialize properties properly', () => {
      expect(tree.contentTemplate).toBe(undefined);
      expect(tree.dropdownTemplate).toBe(undefined);
      expect(tree.leafOnlySelection).toBe(false);
      expect(tree.disableParents).toBe(false);
      expect(tree.selectable).toBe(false);
      expect(tree.nodeContent.length).toBe(0);
      expect(tree.nodeDropdown.length).toBe(0);
    });

    it('Expand all should expand all nodes', () => {
      fixture.detectChanges();

      let nodes = document.querySelectorAll('.sub-item:not([hidden])');
      expect(nodes.length).toBe(0);

      tree.clickExpandAll();
      fixture.detectChanges();
      nodes = document.querySelectorAll('.sub-item:not([hidden])');
      expect(nodes.length).toBe(4);
    });

    it('Collapse all should collapse all nodes', () => {
      tree.clickExpandAll();
      fixture.detectChanges();
      let nodes = document.querySelectorAll('.sub-item:not([hidden])');
      expect(nodes.length).toBe(4);

      tree.clickCollapseAll();
      fixture.detectChanges();
      nodes = document.querySelectorAll('.sub-item:not([hidden])');
      expect(nodes.length).toBe(0);
    });

    it('All nodes should be enabled', () => {
      let nodes = element.queryAll(By.css('sky-contrib-tree-view-node'))
        .map(n => n.componentInstance);
      expect(nodes.length).not.toBe(0);

      nodes.forEach(n => {
        expect(n.enabled).toBe(true);
      });
    });
  });

  describe('Empty fixture', () => {
    let component: TreeViewNoDataTestComponent,
        fixture: any,
        nativeElement: HTMLElement,
        element: DebugElement,
        tree: SkyTreeViewComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          TreeViewFixturesModule
        ]
      });

      fixture = TestBed.createComponent(TreeViewNoDataTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance;
      tree = component.tree;
      fixture.detectChanges();
    }));

    it('tree should have no data', () => {
      tree.data.take(1).subscribe(data => {
        expect(data.length).toBe(0);
      });
    });

    it('tree should not show controls', () => {
      expect(tree.showControls).toBe(false);
      let controls = document.querySelectorAll('tree-header-bar');
      expect(controls.length).toBe(0);
    });

    it('Set up an empty node', () => {
      let emptyNode: TreeNodeModel = new TreeNodeModel();
      expect(emptyNode).not.toBe(null);
      emptyNode = new TreeNodeModel({children: 'notArray'});
      expect(emptyNode.children.length).toBe(0);
      emptyNode.children.push(new TreeNodeModel());
      emptyNode = new TreeNodeModel(emptyNode);
      expect(emptyNode.children.length).not.toBe(0);
    });
  });

  describe('Templated fixture', () => {
    let component: TreeViewTemplatedTestComponent,
        fixture: any,
        nativeElement: HTMLElement,
        element: DebugElement,
        tree: SkyTreeViewComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          TreeViewFixturesModule
        ]
      });

      fixture = TestBed.createComponent(TreeViewTemplatedTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance;
      tree = component.tree;
      fixture.detectChanges();
    }));

    it('tree should apply external content template', () => {
      expect(tree.contentTemplate).not.toBe(undefined);
      let content: any = document.querySelectorAll('span');

      expect(content[1].textContent.search('template magic!') > -1).toBe(true);
    });

    it('tree should apply dropdown template', () => {
      expect(tree.dropdownTemplate).not.toBe(undefined);
      let contextMenu = document.querySelector('sky-dropdown');
      expect(contextMenu).not.toBe(null);

      let dropdownComponent = element.query(By.css('sky-contrib-tree-view-dropdown'));
      expect(dropdownComponent).not.toBe(null);
      expect(dropdownComponent.componentInstance.template).not.toBe(undefined);
    });

    it('expands a node when expand icon is clicked', () => {
      tree.treeNodes.take(1).subscribe(nodes => {
        expect(nodes[0].expanded).toBe(false);
        let expand = element.query(By.css('.fa-plus-square-o'));
        expect(expand).not.toBe(null);

        expand.triggerEventHandler('click', undefined);
        fixture.detectChanges();

        let node = element.query(By.css('sky-contrib-tree-view-node'));
        expect(node.componentInstance.node.expanded).toBe(true);
      });
    });

    it('selects a node when checkbox is clicked', () => {
      tree.treeNodes.take(1).subscribe(nodes => {
        expect(nodes[0].selected).toBe(false);
        tree.clickExpandAll();
        fixture.detectChanges();
        let checkbox: any = document.querySelector('input');
        expect(checkbox).not.toBe(null);

        checkbox.click();
        fixture.detectChanges();

        tree.treeNodes.take(1).subscribe(treeNodes => {
          expect(treeNodes[0].selected).toBe(true);
        });
      });
    });

    it('Select all selects all checkboxes', () => {
      tree.clickSelectAll();
      fixture.detectChanges();

      let checkboxes = element.queryAll(By.css('sky-checkbox')).map(c => c.componentInstance);
      expect(checkboxes.length).not.toBe(0);

      checkboxes.forEach(c => {
        expect(c.checked).toBe(true);
      });
    });

    it('Clear all clears all checkboxes', () => {
      tree.clickSelectAll();
      fixture.detectChanges();

      let checkboxes = element.queryAll(By.css('sky-checkbox')).map(c => c.componentInstance);
      checkboxes.forEach(c => {
        expect(c.checked).toBe(true);
      });

      tree.clickClearAll();
      fixture.detectChanges();

      checkboxes = element.queryAll(By.css('sky-checkbox')).map(c => c.componentInstance);
      checkboxes.forEach(c => {
        expect(c.checked).toBe(false);
      });
    });
  });

  describe('Checkboxes fixture', () => {
    let component: TreeViewCheckboxesTestComponent,
        fixture: any,
        nativeElement: HTMLElement,
        element: DebugElement,
        tree: SkyTreeViewComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          TreeViewFixturesModule
        ]
      });

      fixture = TestBed.createComponent(TreeViewCheckboxesTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance;
      tree = component.tree;
      fixture.detectChanges();
    }));

    it('Select all selects all checkboxes', () => {
      tree.clickSelectAll();
      fixture.detectChanges();

      let checkboxes = element.queryAll(By.css('sky-checkbox')).map(c => c.componentInstance);
      expect(checkboxes.length).not.toBe(0);

      checkboxes.forEach(c => {
        expect(c.checked).toBe(true);
      });
    });

    it('Parent node has selected children', () => {
      tree.clickSelectAll();
      fixture.detectChanges();

      let node = element.query(By.css('sky-checkbox'));
      expect(node).not.toBe(null);
      expect(node.componentInstance.checked).toBe(true);
    });
  });
});
