'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.setDefaults = setDefaults;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _renderCombination = require('./renderCombination');

var _renderCombination2 = _interopRequireDefault(_renderCombination);

var _ErrorDisplay = require('./ErrorDisplay');

var _ErrorDisplay2 = _interopRequireDefault(_ErrorDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkForMissingProps = function checkForMissingProps(component, possibleValuesByPropName) {
  if (typeof component === 'string') {
    return new Error('mustProvideAllProps option is not supported for built-in components');
  }

  var componentProps = (0, _keys2.default)(component.propTypes);
  var propsWithProvidedValues = (0, _keys2.default)(possibleValuesByPropName);
  var missingProps = componentProps.filter(function (pn) {
    return propsWithProvidedValues.indexOf(pn) < 0;
  });

  if (missingProps.length) {
    return new Error('Missing possible values for props: ' + missingProps.join(', '));
  }

  return null;
};

var defaultOptions = {
  renderCombination: _renderCombination2.default,
  showSource: true,
  mustProvideAllProps: false
};

exports.default = {
  addWithPropsCombinations: function addWithPropsCombinations(storyName, component, possibleValuesByPropName, userOptions) {
    var options = (0, _extends3.default)({}, defaultOptions, userOptions);

    var renderCombination = options.renderCombination,
        mustProvideAllProps = options.mustProvideAllProps;


    var propsCombinations = (0, _utils.combinations)(possibleValuesByPropName);

    this.add(storyName, function () {
      if (mustProvideAllProps) {
        var err = checkForMissingProps(component, possibleValuesByPropName);

        if (err) {
          return _react2.default.createElement(_ErrorDisplay2.default, { message: err.message });
        }
      }

      return _react2.default.createElement(
        'div',
        null,
        propsCombinations.map(function (props) {
          return renderCombination(component, props, options);
        })
      );
    });
  }
};
function setDefaults(newDefaults) {
  return (0, _assign2.default)(defaultOptions, newDefaults);
}