'use strict';

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var assert = require('assert');

var DateTimeGroup = require('../');

describe('TimeSelect', function() {
  it('is an element', function() {
    assert(TestUtils.isElement(<DateTimeGroup />));
  });
});
