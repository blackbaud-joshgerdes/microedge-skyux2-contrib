import { Injectable } from '@angular/core';

import { SkyContribDemoComponent } from './demo-component';

@Injectable()
export class SkyContribDemoComponentsService {
  public getComponents(filter?: string): SkyContribDemoComponent[] {
    return [
      {
        name: 'Draggable Repeater',
        icon: 'bars',
        // tslint:disable-next-line
        summary: `The draggable repeater component is used to display data in a draggable list.`,
        url: '/components/draggable-repeater',
        getCodeFiles: function () {
          return [
            {
              name: 'draggable-repeater-demo.component.html',
              fileContents:
              require('!!raw-loader!./draggable-repeater/draggable-repeater-demo.component.html')
            },
            {
              name: 'draggable-repeater-demo.component.ts',
              fileContents:
              require('!!raw-loader!./draggable-repeater/draggable-repeater-demo.component.ts'),
              componentName: 'SkyDraggableRepeaterDemoComponent',
              bootstrapSelector: 'sky-contrib-draggable-repeater-demo'
            }
          ];
        }
      },
      {
        name: 'List',
        icon: 'list',
        // tslint:disable-next-line
        summary: `The list component is used to display data in a consistent and flexible way.`,
        url: '/components/list',
        getCodeFiles: function () {
          return [
            {
              name: 'list-demo.component.html',
              fileContents: require('!!raw-loader!./list/list-demo.component.html')
            },
            {
              name: 'list-demo.component.ts',
              fileContents: require('!!raw-loader!./list/list-demo.component.ts'),
              componentName: 'SkyListDemoComponent',
              bootstrapSelector: 'sky-contrib-list-demo'
            },
            {
              name: 'list-demo-custom.component.html',
              fileContents: require('!!raw-loader!./list/list-demo-custom.component.html')
            },
            {
              name: 'list-demo-custom.component.ts',
              fileContents: require('!!raw-loader!./list/list-demo-custom.component.ts'),
              componentName: 'SkyListDemoCustomComponent',
              bootstrapSelector: 'sky-contrib-list-demo-custom'
            },
            {
              name: 'list-view-custom.component.html',
              fileContents: require('!!raw-loader!./list/list-view-custom.component.html')
            },
            {
              name: 'list-view-custom.component.ts',
              fileContents: require('!!raw-loader!./list/list-view-custom.component.ts'),
              componentName: 'SkyListViewCustomComponent',
              bootstrapSelector: 'sky-contrib-list-view-custom'
            }
          ];
        }
      },
      {
        name: 'List Action Bar',
        icon: 'bolt',
        // tslint:disable-next-line
        summary: `The action bar component is used to take actions on selected items
        in the list component.`,
        url: '/components/list-action-bar',
        getCodeFiles: function () {
          return [
            {
              name: 'list-action-bar-demo.component.html',
              fileContents:
                require('!!raw-loader!./list-action-bar/list-action-bar-demo.component.html')
            },
            {
              name: 'list-action-bar-demo.component.ts',
              fileContents:
                require('!!raw-loader!./list-action-bar/list-action-bar-demo.component.ts'),
              componentName: 'SkyListActionBarDemoComponent',
              bootstrapSelector: 'sky-contrib-list-action-bar-demo'
            }
          ];
        }
      },
      {
        name: 'List Filters',
        icon: 'filter',
        // tslint:disable-next-line
        summary: `The list filters component is used to filter data displayed
        in the list component.`,
        url: '/components/list-filters',
        getCodeFiles: function () {
          return [
            {
              name: 'list-filters-demo.component.html',
              fileContents: require('!!raw-loader!./list-filters/list-filters-demo.component.html')
            },
            {
              name: 'list-filters-demo.component.ts',
              fileContents: require('!!raw-loader!./list-filters/list-filters-demo.component.ts'),
              componentName: 'SkyListFiltersDemoComponent',
              bootstrapSelector: 'sky-contrib-list-filters-demo'
            },
            {
              name: 'list-filters-demo-modal.component.html',
              fileContents:
                require('!!raw-loader!./list-filters/list-filters-demo-modal.component.html')
            },
            {
              name: 'list-filters-demo-modal.component.ts',
              fileContents:
                require('!!raw-loader!./list-filters/list-filters-demo-modal.component.ts'),
              componentName: 'SkyListFiltersDemoModalComponent',
              bootstrapSelector: 'sky-contrib-list-filters-demo-modal'
            },
            {
              name: 'list-filters-demo-combo.component.html',
              fileContents:
                require('!!raw-loader!./list-filters/list-filters-demo-combo.component.html')
            },
            {
              name: 'list-filters-demo-combo.component.ts',
              fileContents:
                require('!!raw-loader!./list-filters/list-filters-demo-combo.component.ts'),
              componentName: 'SkyListFiltersDemoComboComponent',
              bootstrapSelector: 'sky-contrib-list-filters-demo-combo'
            }
          ];
        }
      },
      {
        name: 'List Paging',
        icon: 'files-o',
        // tslint:disable-next-line
        summary: `The list component is used to display data in a consistent and flexible way.`,
        url: '/components/list-paging',
        getCodeFiles: function () {
          return [
            {
              name: 'list-paging-demo.component.html',
              fileContents:
              require('!!raw-loader!./list-paging/list-paging-demo.component.html')
            },
            {
              name: 'list-paging-demo.component.ts',
              fileContents:
              require('!!raw-loader!./list-paging/list-paging-demo.component.ts'),
              componentName: 'SkyListPagingDemoComponent',
              bootstrapSelector: 'sky-contrib-list-paging-demo'
            }
          ];
        }
      },
      {
        name: 'List Toolbar',
        icon: 'wrench',
        // tslint:disable-next-line
        summary: `The list component is used to display data in a consistent and flexible way.`,
        url: '/components/list-toolbar',
        getCodeFiles: function () {
          return [
            {
              name: 'list-toolbar-demo.component.html',
              fileContents: require('!!raw-loader!./list-toolbar/list-toolbar-demo.component.html')
            },
            {
              name: 'list-toolbar-demo.component.ts',
              fileContents: require('!!raw-loader!./list-toolbar/list-toolbar-demo.component.ts'),
              componentName: 'SkyListToolbarDemoComponent',
              bootstrapSelector: 'sky-contrib-list-toolbar-demo'
            },
            {
              name: 'list-toolbar-demo-custom.component.html',
              fileContents:
                require('!!raw-loader!./list-toolbar/list-toolbar-demo-custom.component.html')
            },
            {
              name: 'list-toolbar-demo-custom.component.ts',
              fileContents:
                require('!!raw-loader!./list-toolbar/list-toolbar-demo-custom.component.ts'),
              componentName: 'SkyListToolbarDemoCustomComponent',
              bootstrapSelector: 'sky-contrib-list-toolbar-demo-custom'
            }
          ];
        }
      },
      {
        name: 'List View Checklist',
        icon: 'list-ul',
        // tslint:disable-next-line
        summary: `The list component is used to display data in a consistent and flexible way.`,
        url: '/components/list-view-checklist',
        getCodeFiles: function () {
          return [
            {
              name: 'list-view-checklist-demo.component.html',
              fileContents:
              require('!!raw-loader!./list-view-checklist/list-view-checklist-demo.component.html')
            },
            {
              name: 'list-view-checklist-demo.component.ts',
              fileContents:
              require('!!raw-loader!./list-view-checklist/list-view-checklist-demo.component.ts'),
              componentName: 'SkyListViewChecklistDemoComponent',
              bootstrapSelector: 'sky-contrib-list-view-checklist-demo'
            }
          ];
        }
      },
      {
        name: 'List View Grid',
        icon: 'table',
        // tslint:disable-next-line
        summary: `The list component is used to display data in a consistent and flexible way.`,
        url: '/components/list-view-grid',
        getCodeFiles: function () {
          return [
            {
              name: 'list-view-grid-demo.component.html',
              fileContents:
                require('!!raw-loader!./list-view-grid/list-view-grid-demo.component.html')
            },
            {
              name: 'list-view-grid-demo.component.ts',
              fileContents:
                require('!!raw-loader!./list-view-grid/list-view-grid-demo.component.ts'),
              componentName: 'SkyListViewGridDemoComponent',
              bootstrapSelector: 'sky-contrib-list-view-grid-demo'
            }
          ];
        }
      },
      {
        name: 'List View Repeater',
        icon: 'bars',
        // tslint:disable-next-line
        summary: `The list component is used to display data in a consistent and flexible way.`,
        url: '/components/list-view-repeater',
        getCodeFiles: function () {
          return [
            {
              name: 'list-view-repeater-demo.component.html',
              fileContents:
              require('!!raw-loader!./list-view-repeater/list-view-repeater-demo.component.html')
            },
            {
              name: 'list-view-repeater-demo.component.ts',
              fileContents:
              require('!!raw-loader!./list-view-repeater/list-view-repeater-demo.component.ts'),
              componentName: 'SkyListViewRepeaterDemoComponent',
              bootstrapSelector: 'sky-contrib-list-view-repeater-demo'
            }
          ];
        }
      },
      {
        name: 'Locale-Currency-Mask',
        icon: 'usd',
        // tslint:disable-next-line
        summary: `The tree view component displays data in an expandable/collapsable tree
        (parent/child) view.`,
        url: '/components/locale-currency-mask',
        getCodeFiles: function () {
          return [
            {
              name: 'locale-currency-mask-demo.component.html',
              fileContents: require(
                '!!raw-loader!./locale-currency-mask/locale-currency-mask-demo.component.html')
            },
            {
              name: 'locale-currency-mask-demo.component.ts',
              fileContents: require(
                '!!raw-loader!./locale-currency-mask/locale-currency-mask-demo.component.ts'),
              componentName: 'SkyVerticalTabbarDemoComponent',
              bootstrapSelector: 'sky-locale-currency-mask-demo'
            }
          ];
        }
      },
      {
        name: 'Tree-View',
        icon: 'tree',
        // tslint:disable-next-line
        summary: `The tree view component displays data in an expandable/collapsable tree (parent/child) view.`,
        url: '/components/tree-view',
        getCodeFiles: function () {
          return [
            {
              name: 'tree-view-demo.component.html',
              fileContents: require('!!raw-loader!./tree-view/tree-view-demo.component.html')
            },
            {
              name: 'tree-view-demo.component.ts',
              fileContents: require('!!raw-loader!./tree-view/tree-view-demo.component.ts'),
              componentName: 'SkyVerticalTabbarDemoComponent',
              bootstrapSelector: 'sky-tree-view-demo'
            }
          ];
        }
      },
      {
        name: 'Vertical-Tabbar',
        icon: 'bars',
        // tslint:disable-next-line
        summary: `The vertical tabbar component displays a vertical tabbar to select multiple content sections`,
        url: '/components/vertical-tabbar',
        getCodeFiles: function () {
          return [
            {
              name: 'vertical-tabbar-demo.component.html',
              fileContents:
                require('!!raw-loader!./vertical-tabbar/vertical-tabbar-demo.component.html')
            },
            {
              name: 'vertical-tabbar-demo.component.ts',
              fileContents:
                require('!!raw-loader!./vertical-tabbar/vertical-tabbar-demo.component.ts'),
              componentName: 'SkyVerticalTabbarDemoComponent',
              bootstrapSelector: 'sky-vertical-tabbar-demo'
            }
          ];
        }
      },
      {
        name: 'Wizard',
        icon: 'magic',
        summary: `The wizard component displays multiple step content sections.`,
        url: '/components/wizard',
        getCodeFiles: function () {
          return [
            {
              name: 'wizard-demo.component.html',
              fileContents:
                require('!!raw-loader!./wizard/wizard-demo.component.html')
            },
            {
              name: 'wizard-demo.component.ts',
              fileContents:
                require('!!raw-loader!./wizard/wizard-demo.component.ts'),
              componentName: 'SkyWizardDemoComponent',
              bootstrapSelector: 'sky-wizard-demo'
            },
            {
              name: 'wizard-demo-form.component.html',
              fileContents:
                require('!!raw-loader!./wizard/wizard-demo-form.component.html')
            },
            {
              name: 'wizard-demo-form.component.ts',
              fileContents:
                require('!!raw-loader!./wizard/wizard-demo-form.component.ts'),
              componentName: 'SkyWizardDemoFormComponent',
              bootstrapSelector: 'sky-wizard-demo-form'
            }
          ];
        }
      }
    ];
  }
}
