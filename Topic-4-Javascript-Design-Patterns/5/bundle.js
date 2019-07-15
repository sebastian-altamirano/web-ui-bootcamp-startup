"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Actor = function Actor(name, age) {
  _classCallCheck(this, Actor);

  this.name = name;
  this.age = age;
};

exports["default"] = Actor;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Contains the listeners asocciated to an event through "on" method from
// EventEmitter instances (or instances derived from EventEmitter).
var _listeners = {};

var EventEmitter =
/*#__PURE__*/
function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);
  } // Adds a listener to an event.
  // INPUT:
  // <-- eventName: string
  // The event that will call the listener when emitted (and any other listener
  // associated to it).
  // <-- callback: function ** IF THE REFERENCE TO THE CALLBACK IS LOST AT SOME
  // POINT IT CAN'T BE REMOVED (don't use anonymous functions, or functions
  // whose scope is not global) **
  // The callback that will be called when the event is emitted.
  // OUTPUT:
  // --> void
  // The callback has been added as a listener to the event.


  _createClass(EventEmitter, [{
    key: "on",
    value: function on(eventName, callback) {
      if (_listeners[eventName] === undefined) _listeners[eventName] = [];

      _listeners[eventName].push(callback);
    } // Emits an event, calling every listener associated to it in consequence.
    // INPUT:
    // <-- eventName: string
    // The event from which to call its listeners.
    // OUTPUT:
    // --> RangeError
    // The event has no listeners to call.

  }, {
    key: "emit",
    value: function emit(eventName) {
      if (_listeners[eventName] !== undefined) _listeners[eventName].forEach(function (callback) {
        return callback();
      });else throw new RangeError("".concat(eventName, " don't have any listeners to call."));
    } // Removes a listener from an event.
    // INPUT:
    // <-- eventName: string
    // The event from which to remove the listener.
    // <-- callback: function
    // The callback that will be removed from the event listeners.
    // OUTPUT:
    // --> RangeError
    // The event has no listeners no remove.
    // --> RangeError
    // The callback wasn't listening to the event.

  }, {
    key: "off",
    value: function off(eventName, callback) {
      var listeners = _listeners[eventName];

      if (listeners !== undefined) {
        var indexOfCallbackToRemove = listeners.indexOf(callback);

        if (indexOfCallbackToRemove !== -1) {
          listeners[indexOfCallbackToRemove] = listeners[listeners.length - 1];
          listeners.pop();
        } else throw new RangeError("".concat(callback.name, " wasn't listening to ").concat(eventName, "."));
      } else throw new RangeError("".concat(eventName, " has no listeners to remove."));
    }
  }]);

  return EventEmitter;
}();

var _default = {
  _listeners: _listeners,
  EventEmitter: EventEmitter
};
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Logger =
/*#__PURE__*/
function () {
  function Logger() {
    _classCallCheck(this, Logger);
  }

  _createClass(Logger, [{
    key: "log",
    value: function log(info) {
      console.log(info);
    }
  }]);

  return Logger;
}();

exports["default"] = Logger;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _EventEmitter2 = _interopRequireDefault(require("./EventEmitter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Movie =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(Movie, _EventEmitter);

  function Movie(name, year, duration) {
    var _this;

    _classCallCheck(this, Movie);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Movie).call(this));
    _this.title = name;
    _this.year = year;
    _this.duration = duration;
    _this.cast = [];
    return _this;
  }

  _createClass(Movie, [{
    key: "play",
    value: function play() {
      this.emit('play');
    }
  }, {
    key: "pause",
    value: function pause() {
      this.emit('pause');
    }
  }, {
    key: "resume",
    value: function resume() {
      this.emit('resume');
    }
  }, {
    key: "addCast",
    value: function addCast(cast) {
      this.cast = this.cast.concat(cast);
    }
  }]);

  return Movie;
}(_EventEmitter2["default"]);

exports["default"] = Movie;
