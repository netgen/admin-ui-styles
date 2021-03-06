# Netgen UI

Styles and js for simple Netgen Admin UI plugins.
Including:
- jsTree
- buttons with effect
- tabs
- tooltips
- resizable sidebar
- checkbox enabled/disabled buttons

## Install

Install the Node dependency:
```
yarn add @netgen/admin-ui
```
or
```
npm install @netgen/admin-ui
```

## Using CSS

Import styles to scss file:
```scss
@import "@netgen/admin-ui/scss/style";
```

You also need to configure sass-loader to understand the `@netgen` imports from node_modules. Update your sass-loader config by changing `{ loader: 'sass-loader' }` to:
```js
{
  loader: 'sass-loader',
  options: {
    includePaths: ['./node_modules']
  }
}
```

You can override scss variables for base font family and path to main logo image:
```scss
$baseFont: 'Roboto', Helvetica, Arial, sans-serif;
$mainLogoPath: '../images/ng-ui-logo.svg';
```

If you don't use scss, you can include already built css file from `node_modules/@netgen/admin-ui/dist/css/style.css` or minified `style.min.css`.

## Using JS

To include the ES2015 modules and initialize the plugins for all of the UI plugins:
```js
import { NgUiInit } from '@netgen/admin-ui';

NgUiInit();
```

If you can't use ES2015 modules and don't need to initialize plugin on specific event, you can include already built js file from `node_modules/@netgen/admin-ui/dist/js/include/ngui.js` which initializes all of the UI plugins on window load.

### Tree

To include only tree plugin and initialize it:
```js
import { NgUiTreeInit } from '@netgen/admin-ui';

NgUiTreeInit('ng-ui-tree-wrapper', { modal: true });
```

First parameter is the class name for tree element.
Second parameters are options for the tree:
- modal - boolean - is the tree opened in modal window (default false)
- treeClassName - string - class name for div on which jstree is initialized (default 'ng-ui-tree')
- modalClassName - string - class name for modal div in which tree is opened (default 'ng-modal')

### Tabs

To include only tabs plugin and initialize it:
```js
import { NgUiTabsInit } from '@netgen/admin-ui';

NgUiTabsInit('ng-ui-tabs');
```

Function parameter is the class name for the tabs element (default 'ng-ui-tabs').

Html markup for the tabs should be:
```html
<div class="ng-ui-tabs">
    <ul class="ng-ui-tab-controls">
        <li><a class="ng-ui-tab-control" data-target="tab1" href="#tab1">Tab1</a></li>
        <li><a class="ng-ui-tab-control" data-target="tab2" href="#tab2">Tab2</a></li>
        <li><a class="ng-ui-tab-control" data-target="tab3" href="#tab3">Tab3</a></li>
    </ul>
    <div class="ng-ui-tab" data-tab="#tab1">
        Tab1 content
    </div>
    <div class="ng-ui-tab" data-tab="#tab2">
        Tab2 content
    </div>
    <div class="ng-ui-tab" data-tab="#tab3">
        Tab3 content
    </div>
</div>
```

Last active tab is remembered in localStorage.

### Buttons

To include only buttons plugin and initialize it:
```js
import { NgUiBtnInit } from '@netgen/admin-ui';

NgUiTabsInit('ng-ui-btn');
```

Function parameter is the class name for the button elements (default 'ng-ui-btn').

### Tooltips

To include only tooltip plugin and initialize it:
```js
import { NgUiTooltipInit } from '@netgen/admin-ui';

NgUiTooltipInit('ng-ui-tt');
```

Function parameter is the class name for the tooltip elements (default 'ng-ui-tt').

Required markup for a tooltip is only css class (default: 'ng-ui-tt', can be overriden with initialization parameter), and title attribute for element you wish to have a tooltip. Title can have html markup, but all of the quotes inside of it must be single.
Example:
```html
<span class="ng-ui-tt" title="Lorem ipsum <a href='#'>dolor sit amet</a>, consectetur?">some text</span>
```

### Sidebar resize

Plugin initializes with main init function (NgUiInit).
Class name for resizable sidebar div should be `'ng-ui-sidebar-resizable'`.
Resizable sidebar connects with main logo and resizes it while resizing sidebar. Logo class name should be `'ng-ui-logo'`.

### Checkbox enable/disable buttons

Plugin initializes with main init function (NgUiInit).
Use it to enable/disable buttons with checkbox inputs.

Checkbox inputs should have data-enable attribute `data-enable="Target"`.
Buttons should have data-enabler attribute `data-enabler="Target"`.

If none of the checkboxes with the same `data-enable` attribute is checked, buttons with that `data-disabler` attribute are disabled. If you check any of the checkboxes, buttons are enabled.
