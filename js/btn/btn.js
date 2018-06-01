export default class NgUiBtn {
  constructor(el) {
    this.el = el;
    this.init();
  }

  init() {
    if (this.el.dataset.nguibtn) return;
    this.setupEvents();
    this.el.dataset.nguibtn = this;
  }

  setupEvents() {
    this.el.addEventListener('click', (e) => {
      if (e.currentTarget.attributes.disabled) e.preventDefault();
    });
    this.el.addEventListener('mousedown', (e) => {
      this.removeEffect();
      this.addEffect(e);
    });
  }

  addEffect(e) {
    const effect = document.createElement('span');
    effect.classList.add('ng-ui-btn-effect');
    this.el.appendChild(effect);
    this.calcPos(e, effect);
    effect.addEventListener('animationend', this.removeEffect.bind(this));
  }

  removeEffect() {
    if (this.el.querySelector('.ng-ui-btn-effect')) this.el.removeChild(this.el.querySelector('.ng-ui-btn-effect'));
  }

  calcPos(e, effect) {
    const elWidth = this.el.offsetWidth;
    const rel = {
      x: e.pageX - this.el.offsetLeft,
      y: e.pageY - this.el.offsetTop,
    };
    const effectWidth = rel.x <= (elWidth / 2) ? (elWidth - rel.x) * 2.4 : rel.x * 2.4;
    const effectCss = {
      left: `${rel.x}px`,
      top: `${rel.y}px`,
      width: `${effectWidth}px`,
      height: `${effectWidth}px`,
    };
    Object.assign(effect.style, effectCss);
  }
}
