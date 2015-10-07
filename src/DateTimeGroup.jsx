'use strict';

var fs = require('fs');
var path = require('path');
var insertcss = require('insert-css');
insertcss(fs.readFileSync(path.join(__dirname, '/../node_modules/react-datepicker/dist/react-datepicker.css'), 'utf8'));

var React = require('react');
var TimePicker = require('react-time-select');
var DatePicker = require('react-datepicker');
var ReactBootstrap = require('react-bootstrap');

var DateTimeGroup = React.createClass({
  propTypes: {
    includeTime: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      includeTime: true
    };
  },

  render: function() {
    var timePickerColumn = <span />;

    if (this.props.includeTime) {
      timePickerColumn = (
        <ReactBootstrap.Col xs={12} md={4}>
          <TimePicker />
        </ReactBootstrap.Col>
      );
    }

    return (
      <ReactBootstrap.Grid>
        <ReactBootstrap.Row>
          <ReactBootstrap.Col xs={12} md={8}>
            <label className="control-label">
              <span>Date</span>
            </label>
            <DatePicker />
          </ReactBootstrap.Col>
          {timePickerColumn}
        </ReactBootstrap.Row>
      </ReactBootstrap.Grid>
    );
  }
});

module.exports = DateTimeGroup;
