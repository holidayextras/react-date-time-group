'use strict';

var React = require('react');
var DateTimeGroup = require('../src/DateTimeGroup.jsx');

React.render(
  <div>
    <h1>Defaults</h1>
    <DateTimeGroup />

    <h1>Date Only</h1>
    <DateTimeGroup includeTime={false} />
  </div>
  ,
  document.getElementById('container')
);
