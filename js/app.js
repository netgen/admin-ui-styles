import NgUiBtn from './btn/btn';
import NgUiTabs from './tabs/tabs';

export default NgUiInit = () => {
  const nguibtns = document.getElementsByClassName('ng-ui-btn');
  [].forEach.call(nguibtns, el => new NgUiBtn(el));

  const nguitabs = document.getElementsByClassName('ng-ui-tabs');
  [].forEach.call(nguitabs, el => new NgUiTabs(el));
};
