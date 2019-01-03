import NgUiBtn from './btn/btn';
import NgUiTabs from './tabs/tabs';
import NgUiTree from './tree/tree';
import NgUiResize from './resize/resize';
import NgUiTooltip from './tooltip/tooltip';
import enableBtns from './enableBtns/enableBtns';

function NgUiBtnInit(className) {
  const nguibtns = document.getElementsByClassName(className || 'ng-ui-btn');
  [].forEach.call(nguibtns, el => new NgUiBtn(el));
}

function NgUiTabsInit(className) {
  const nguitabs = document.getElementsByClassName(className || 'ng-ui-tabs');
  [].forEach.call(nguitabs, el => new NgUiTabs(el));
}

function NgUiTreeInit(className, options) {
  const nguitree = document.getElementsByClassName(className || 'ng-ui-tree-wrapper');
  [].forEach.call(nguitree, el => new NgUiTree(el, options));
}

function NgUiResizeInit(className, options) {
  const nguiresize = document.getElementsByClassName(className || 'ng-ui-sidebar-resizable');
  [].forEach.call(nguiresize, el => new NgUiResize(el, options || { connectWith: '.ng-ui-logo' }));
}

function NgUiTooltipInit(className) {
  const nguitooltips = document.getElementsByClassName(className || 'ng-ui-tt');
  [].forEach.call(nguitooltips, el => new NgUiTooltip(el));
}

function NgUiInit() {
  NgUiBtnInit();
  NgUiTabsInit();
  NgUiTreeInit();
  NgUiTooltipInit();
  enableBtns();
  NgUiResizeInit();
}

export { NgUiInit, NgUiBtnInit, NgUiTabsInit, NgUiTreeInit, NgUiTooltipInit };
