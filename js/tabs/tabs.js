/* tabs */
export default class NgUiTabs {
  constructor(el) {
    this.el = el;
    this.controls = this.el.querySelectorAll('.ng-ui-tab-control');

    this.init();
  }

  init() {
    if (this.el.dataset.nguitabs) return;
    this.el.dataset.nguitabs = true;
    this.setupEvents();
    this.initialSelect();
  }

  initialSelect() {
    let initialTab = this.controls[0];
    if (localStorage.tagsTabActive) {
      this.controls.forEach((control) => {
        if (control.hash === localStorage.tagsTabActive) initialTab = control;
      });
    }
    this.showTab(initialTab);
  }

  setupEvents() {
    this.controls.forEach((control) => {
      control.addEventListener('click', (e) => {
        e.preventDefault();
        const trigger = e.currentTarget;
        localStorage.tagsTabActive = trigger.hash;
        this.toggleActive(trigger);
      });
    });
  }

  toggleActive(trigger) {
    this.deactivateTab();
    this.showTab(trigger);
  }

  deactivateTab() {
    const activeTab = this.el.querySelector('[data-tab].active');
    this.controls.forEach((control) => {
      if (control.parentNode.classList.contains('active')) control.parentNode.classList.remove('active');
    });
    if (activeTab) activeTab.classList.remove('active');
  }

  showTab(trigger) {
    if (trigger) trigger.parentNode.classList.add('active');
    const newTab = this.el.querySelector(`[data-tab="${trigger.hash}"]`);
    if (newTab) newTab.classList.add('active');
  }
}
