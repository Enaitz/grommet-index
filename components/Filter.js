'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pick = require('lodash/object/pick');

var _pick2 = _interopRequireDefault(_pick);

var _keys = require('lodash/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _CheckBox = require('grommet/components/CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _RadioButton = require('grommet/components/RadioButton');

var _RadioButton2 = _interopRequireDefault(_RadioButton);

var _Box = require('grommet/components/Box');

var _Box2 = _interopRequireDefault(_Box);

var _Heading = require('grommet/components/Heading');

var _Heading2 = _interopRequireDefault(_Heading);

var _Button = require('grommet/components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Status = require('grommet/components/icons/Status');

var _Status2 = _interopRequireDefault(_Status);

var _CaretDown = require('grommet/components/icons/base/CaretDown');

var _CaretDown2 = _interopRequireDefault(_CaretDown);

var _CaretUp = require('grommet/components/icons/base/CaretUp');

var _CaretUp2 = _interopRequireDefault(_CaretUp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "index-filter";

var Filter = function (_Component) {
  _inherits(Filter, _Component);

  function Filter(props) {
    _classCallCheck(this, Filter);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Filter).call(this, props));

    _this._onChange = _this._onChange.bind(_this);
    _this._onChangeAll = _this._onChangeAll.bind(_this);
    _this._onToggleActive = _this._onToggleActive.bind(_this);

    _this.state = {};
    return _this;
  }

  _createClass(Filter, [{
    key: '_onChange',
    value: function _onChange(value) {
      var exclusive = this.props.exclusive;

      var values = undefined;
      if (exclusive) {
        values = [value];
      } else {
        values = this.props.values.slice(0);
        var index = values.indexOf(value);
        if (-1 === index) {
          values.push(value);
        } else {
          values.splice(index, 1);
        }
      }
      this.props.onChange(values);
    }
  }, {
    key: '_onChangeAll',
    value: function _onChangeAll() {
      this.props.onChange([]);
    }
  }, {
    key: '_onToggleActive',
    value: function _onToggleActive(event) {
      event.preventDefault();
      this.setState({ active: !this.state.active });
    }
  }, {
    key: '_renderChoices',
    value: function _renderChoices() {
      var _this2 = this;

      var _props = this.props;
      var name = _props.name;
      var values = _props.values;
      var choices = _props.choices;
      var all = _props.all;
      var exclusive = _props.exclusive;
      var status = _props.status;

      var Type = exclusive ? _RadioButton2.default : _CheckBox2.default;
      var checkBoxes = choices.map(function (choice) {
        var id = name + '-' + choice.value;
        var checked = -1 !== values.indexOf(choice.value);
        var label = choice.label || choice.value || '';
        if (status) {
          label = _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(_Status2.default, { value: choice.value, size: 'small' }),
            ' ',
            label
          );
        }
        return _react2.default.createElement(Type, { key: id,
          id: id, label: label, checked: checked,
          onChange: _this2._onChange.bind(_this2, choice.value) });
      });

      if (all) {
        checkBoxes.unshift(_react2.default.createElement(Type, { key: name + '-all',
          id: name + '-all', label: 'All', checked: values.length === 0,
          onChange: this._onChangeAll }));
      }
      return _react2.default.createElement(
        _Box2.default,
        { direction: 'column', pad: { between: 'small' } },
        checkBoxes
      );
    }
  }, {
    key: '_renderSummary',
    value: function _renderSummary() {
      var _props2 = this.props;
      var values = _props2.values;
      var choices = _props2.choices;
      var all = _props2.all;

      var summary = undefined;
      if (values.length === 0) {
        if (all) {
          summary = 'All';
        }
      } else if (values.length === 1) {
        summary = choices.filter(function (choice) {
          return values.indexOf(choice.value) !== -1;
        }).map(function (choice) {
          return choice.label;
        });
      } else {
        summary = values.length + ' values';
      }
      return _react2.default.createElement(
        'label',
        null,
        _react2.default.createElement(
          'strong',
          null,
          summary
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var label = _props3.label;
      var inline = _props3.inline;
      var active = this.state.active;

      var other = (0, _pick2.default)(this.props, (0, _keys2.default)(_Box2.default.propTypes));

      var header = _react2.default.createElement(
        _Heading2.default,
        { tag: 'h3' },
        label
      );
      if (!inline) {
        var summary = this._renderSummary();
        var icon = undefined;
        if (active) {
          icon = _react2.default.createElement(_CaretUp2.default, null);
        } else {
          icon = _react2.default.createElement(_CaretDown2.default, null);
        }

        header = _react2.default.createElement(
          _Box2.default,
          { direction: 'row', justify: 'between', align: 'center',
            className: CLASS_ROOT + '__header',
            onClick: this._onToggleActive },
          _react2.default.createElement(
            'div',
            null,
            header,
            summary
          ),
          _react2.default.createElement(
            _Button2.default,
            { type: 'icon', onClick: this._onToggleActive },
            icon
          )
        );
      }

      var choices = undefined;
      if (inline || active) {
        choices = this._renderChoices();
      }

      return _react2.default.createElement(
        _Box2.default,
        _extends({}, other, { pad: _extends({}, other.pad, { between: 'small' }) }),
        header,
        choices
      );
    }
  }]);

  return Filter;
}(_react.Component);

exports.default = Filter;

Filter.propTypes = {
  all: _react.PropTypes.bool,
  choices: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.shape({
    label: _react.PropTypes.string,
    value: _react.PropTypes.string
  }), _react.PropTypes.string])).isRequired,
  exclusive: _react.PropTypes.bool,
  inline: _react.PropTypes.bool,
  label: _react.PropTypes.string,
  name: _react.PropTypes.string,
  onChange: _react.PropTypes.func, // (values)
  status: _react.PropTypes.bool,
  values: _react.PropTypes.arrayOf(_react.PropTypes.string)
};

Filter.defaultProps = {
  all: true,
  inline: true,
  values: []
};
module.exports = exports['default'];