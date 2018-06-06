class ControledBtns {
  constructor(name) {
    this.name = name;
    this.inputs = document.querySelectorAll(`input[type="checkbox"][data-enable="${name}"]`);
    this.buttons = document.querySelectorAll(`[data-enabler="${name}"]`);

    this.init();
  }

  init() {
    this.toggleButtons();
    this.setupEvents();
  }

  isChecked() {
    return Array.from(this.inputs).some(input => input.checked);
  }

  toggleButtons() {
    const disabled = !this.isChecked();
    this.buttons.forEach((button) => {
      button.disabled = disabled;
    });
  }

  setupEvents() {
    this.inputs.forEach(input => input.addEventListener('change', this.toggleButtons.bind(this)));
  }
}

export default function enableBtns() {
  /* input enabled/disabled buttons */
  const enabledInputs = document.querySelectorAll('input[data-enable]');

  const enabledInputsGroups = Array.from(enabledInputs).reduce((arr, item) => {
    const name = item.dataset.enable;
    if (!arr.includes(name)) arr.push(name);
    return arr;
  }, []);
  enabledInputsGroups.forEach(name => new ControledBtns(name));
}
