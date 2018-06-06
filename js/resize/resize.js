export default class NgUiResize {
  constructor(el, options) {
    if (el.dataset.nguiresize) return;
    this.el = el;
    this.settings = Object.assign({}, {
      connectWith: false,
      minWidth: 140,
    }, options);
    this.handle = document.createElement('div');

    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.init();
  }

  init() {
    this.el.dataset.nguiresize = true;
    if (this.settings.connectWith) {
      this.connected = document.querySelector(this.settings.connectWith);
    }
    this.initialResize();
    this.el.classList.add('ng-ui-resizable');
    this.handle.classList.add('ng-ui-resizable-handle');
    this.el.appendChild(this.handle);
    this.setupEvents();
  }

  setupEvents() {
    this.handle.addEventListener('mousedown', (ev) => {
      ev.preventDefault();
      document.getElementsByTagName('body')[0].classList.add('ng-ui-resizing');
      window.addEventListener('mousemove', this.onMouseMove, false);
      window.addEventListener('mouseup', this.onMouseUp, false);
    });
  }

  onMouseUp() {
    window.removeEventListener('mousemove', this.onMouseMove, false);
    window.removeEventListener('mouseup', this.onMouseUp, false);
    const body = document.getElementsByTagName('body')[0];
    if (!body.classList.contains('ng-ui-resizing')) return;
    body.classList.remove('ng-ui-resizing');
    window.sessionStorage.ngUiResize = this.el.offsetWidth;
  }

  onMouseMove(e) {
    this.resizeEl(e.pageX - this.el.offsetLeft);
  }

  initialResize() {
    const startWidth = window.sessionStorage.ngUiResize || this.el.offsetWidth;
    if (startWidth < this.settings.minWidth) {
      this.resizeEl(this.settings.minWidth);
    } else if (window.sessionStorage.ngUiResize) {
      this.resizeEl(window.sessionStorage.ngUiResize);
    }
  }

  resizeEl(newWidth) {
    if (newWidth < this.settings.minWidth) return;
    Object.assign(this.el.style, { flex: `0 0 ${newWidth}px` });
    if (this.settings.connectWith && this.connected) {
      this.connected.style.width = `${newWidth}px`;
    }
  }
}
