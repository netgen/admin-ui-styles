/* tooltips */
export default class NgUiTooltip {
  constructor(el) {
    this.el = el;
    this.title = el.title;
    this.visible = false;

    if (this.title.length) this.init();
  }

  init() {
    this.el.removeAttribute('title');
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'ng-ui-tt-content';
    this.tooltip.innerHTML = this.title;

    this.el.addEventListener('mouseenter', this.onHover.bind(this));
    this.el.addEventListener('mouseleave', this.onOut.bind(this));
    this.tooltip.addEventListener('mouseenter', this.onHover.bind(this));
    this.tooltip.addEventListener('mouseleave', this.onOut.bind(this));
  }

  onHover() {
    clearTimeout(this.timer);
    this.showTooltip();
  }

  onOut() {
    this.tooltip.classList.add('out');
    this.timer = setTimeout(this.hideTooltip.bind(this), 200);
  }

  showTooltip() {
    this.tooltip.classList.remove('out');
    if (this.visible || !this.title.length) return;
    this.visible = true;
    document.getElementsByTagName('body')[0].appendChild(this.tooltip);
    this.getTooltipPosition();
  }

  hideTooltip() {
    if (!this.visible) return;
    this.visible = false;
    this.tooltip.parentNode.removeChild(this.tooltip);
  }

  getTooltipPosition() {
    const rect = this.el.getBoundingClientRect();
    const ttRect = this.tooltip.getBoundingClientRect();

    /* set left */
    if (rect.left + rect.width / 2 > ttRect.width / 2 && window.innerWidth - rect.left - rect.width / 2 > ttRect.width / 2) {
      this.x = 'center';
      this.tooltip.style.left = `${rect.left + rect.width / 2 - ttRect.width / 2}px`;
    } else if (rect.left > ttRect.width) {
      this.x = 'left';
      this.tooltip.style.left = `${rect.left - ttRect.width - 10}px`;
    } else {
      this.x = 'right';
      this.tooltip.style.left = `${rect.left + rect.width + 10}px`;
    }

    /* set top */
    if (this.x !== 'center') {
      if (rect.top + rect.height / 2 > ttRect.height / 2 && window.innerHeight - rect.top - rect.height / 2 > ttRect.height / 2) {
        this.y = 'center';
        this.tooltip.style.top = `${rect.top + rect.height / 2 - ttRect.height / 2}px`;
      } else if (rect.top > ttRect.height) {
        this.y = 'top';
        this.tooltip.style.top = `${rect.top + rect.height - ttRect.height}px`;
      } else {
        this.y = 'bottom';
        this.tooltip.style.top = `${rect.top}px`;
      }
    } else if (rect.top > ttRect.height) {
      this.y = 'top';
      this.tooltip.style.top = `${rect.top - ttRect.height - 10}px`;
    } else {
      this.y = 'bottom';
      this.tooltip.style.top = `${rect.top + rect.height + 10}px`;
    }
    this.tooltip.dataset.x = this.x;
    this.tooltip.dataset.y = this.y;
  }
}
