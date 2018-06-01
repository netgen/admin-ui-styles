(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _btn = require('./btn/btn');

var _btn2 = _interopRequireDefault(_btn);

var _tabs = require('./tabs/tabs');

var _tabs2 = _interopRequireDefault(_tabs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = NgUiInit = function NgUiInit() {
  var nguibtns = document.getElementsByClassName('ng-ui-btn');
  [].forEach.call(nguibtns, function (el) {
    return new _btn2.default(el);
  });

  var nguitabs = document.getElementsByClassName('ng-ui-tabs');
  [].forEach.call(nguitabs, function (el) {
    return new _tabs2.default(el);
  });
};

},{"./btn/btn":2,"./tabs/tabs":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NgUiBtn = function () {
  function NgUiBtn(el) {
    _classCallCheck(this, NgUiBtn);

    this.el = el;
    this.init();
  }

  _createClass(NgUiBtn, [{
    key: 'init',
    value: function init() {
      if (this.el.dataset.nguibtn) return;
      this.setupEvents();
      this.el.dataset.nguibtn = this;
    }
  }, {
    key: 'setupEvents',
    value: function setupEvents() {
      var _this = this;

      this.el.addEventListener('click', function (e) {
        if (e.currentTarget.attributes.disabled) e.preventDefault();
      });
      this.el.addEventListener('mousedown', function (e) {
        _this.removeEffect();
        _this.addEffect(e);
      });
    }
  }, {
    key: 'addEffect',
    value: function addEffect(e) {
      var effect = document.createElement('span');
      effect.classList.add('ng-ui-btn-effect');
      this.el.appendChild(effect);
      this.calcPos(e, effect);
      effect.addEventListener('animationend', this.removeEffect.bind(this));
    }
  }, {
    key: 'removeEffect',
    value: function removeEffect() {
      if (this.el.querySelector('.ng-ui-btn-effect')) this.el.removeChild(this.el.querySelector('.ng-ui-btn-effect'));
    }
  }, {
    key: 'calcPos',
    value: function calcPos(e, effect) {
      var elWidth = this.el.offsetWidth;
      var rel = {
        x: e.pageX - this.el.offsetLeft,
        y: e.pageY - this.el.offsetTop
      };
      var effectWidth = rel.x <= elWidth / 2 ? (elWidth - rel.x) * 2.4 : rel.x * 2.4;
      var effectCss = {
        left: rel.x + 'px',
        top: rel.y + 'px',
        width: effectWidth + 'px',
        height: effectWidth + 'px'
      };
      Object.assign(effect.style, effectCss);
    }
  }]);

  return NgUiBtn;
}();

exports.default = NgUiBtn;

},{}],3:[function(require,module,exports){
'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('load', function () {
  (0, _app2.default)();
});

},{"./app":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* tabs */
var NgUiTabs = function () {
  function NgUiTabs(el) {
    _classCallCheck(this, NgUiTabs);

    this.el = el;
    this.controls = this.el.querySelectorAll('.ng-ui-tab-control');

    this.init();
  }

  _createClass(NgUiTabs, [{
    key: 'init',
    value: function init() {
      if (this.el.dataset.nguitabs) return;
      this.el.dataset.nguitabs = this;
      this.setupEvents();
      this.initialSelect();
    }
  }, {
    key: 'initialSelect',
    value: function initialSelect() {
      var initialTab = this.controls[0];
      if (localStorage.tagsTabActive) {
        this.controls.forEach(function (control) {
          if (control.hash === localStorage.tagsTabActive) initialTab = control;
        });
      }
      this.showTab(initialTab);
    }
  }, {
    key: 'setupEvents',
    value: function setupEvents() {
      var _this = this;

      this.controls.forEach(function (control) {
        control.addEventListener('click', function (e) {
          e.preventDefault();
          var trigger = e.currentTarget;
          localStorage.tagsTabActive = trigger.hash;
          _this.toggleActive(trigger);
        });
      });
    }
  }, {
    key: 'toggleActive',
    value: function toggleActive(trigger) {
      this.deactivateTab();
      this.showTab(trigger);
    }
  }, {
    key: 'deactivateTab',
    value: function deactivateTab() {
      var activeTab = this.el.querySelector('[data-tab].active');
      this.controls.forEach(function (control) {
        if (control.parentNode.classList.contains('active')) control.parentNode.classList.remove('active');
      });
      if (activeTab) activeTab.classList.remove('active');
    }
  }, {
    key: 'showTab',
    value: function showTab(trigger) {
      if (trigger) trigger.parentNode.classList.add('active');
      var newTab = this.el.querySelector('[data-tab="' + trigger.hash + '"]');
      if (newTab) newTab.classList.add('active');
    }
  }]);

  return NgUiTabs;
}();

exports.default = NgUiTabs;

},{}]},{},[3]);
