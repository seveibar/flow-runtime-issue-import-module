'use strict';

var _animals = require('animals');

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Animal = _flowRuntime2.default.tdz(() => _animals.Animal);

const c = {
  name: 'Dog',
  hasLegs: 'yes' };

console.log(c.id);