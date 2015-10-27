'use strict';

var fs = require('fs');
var path = require('path');
var insertcss = require('insert-css');
insertcss(fs.readFileSync(path.join(__dirname, '/../node_modules/react-datepicker/dist/react-datepicker.css'), 'utf8'));

var React = require('react');
var TimePicker = require('react-time-select');
var DatePicker = require('react-datepicker');
var ReactBootstrap = require('react-bootstrap');
var moment = require('moment');

var DateTimeGroup = React.createClass({
  propTypes: {
    includeTime: React.PropTypes.bool,
    timeClassName: React.PropTypes.string,
    timeLabel: React.PropTypes.string,
    timeName: React.PropTypes.string,
    value: React.PropTypes.instanceOf(Date),
    onChange: React.PropTypes.func,
    timeStart: React.PropTypes.number,
    timeEnd: React.PropTypes.number,
    timeStep: React.PropTypes.number,
    dateName: React.PropTypes.string,
    dateLabel: React.PropTypes.string,
    dateStart: React.PropTypes.instanceOf(Date),
    dateEnd: React.PropTypes.instanceOf(Date),
    dateFormat: React.PropTypes.string,
    dateExclusions: React.PropTypes.array,
    locales: React.PropTypes.array
  },

  getDefaultProps: function() {
    var defaultDate = new Date();
    defaultDate.setHours(12, 0, 0, 0);

    return {
      includeTime: true,
      dateLabel: 'Date',
      dateName: 'Date',
      value: defaultDate,
      locales: [ 'en-GB' ]
    };
  },

  timeChanged: function(newDateTime) {
    if (this.props.onChange) {
      this.props.onChange(newDateTime);
    }
  },

  dateChanged: function(newMoment) {
    if (this.props.onChange) {
      var newDate = newMoment.toDate();
      newDate.setHours(this.props.value.getHours(), this.props.value.getMinutes(), 0, 0);

      this.props.onChange(newDate);
    }
  },

  dateExclusions: function() {
    if (!this.props.dateExclusions) {
      return null;
    }

    return this.props.dateExclusions.map(function(date) {
      return moment(date);
    });
  },

  render: function() {
    var timePickerColumn = <span />;

    // Should we mixin ReactIntl to ourselves so locales is pushed further down automatically?
    // Do we need a ReactIntl compatible date picker for that to make sense, or to
    // intercept it here to pass in their own (maybe Moment's) intl data?
    if (this.props.includeTime) {
      timePickerColumn = (
        <div className={this.props.timeContainerClass}>
          <TimePicker
            className={this.props.timeClassName}
            label={this.props.timeLabel}
            name={this.props.timeName}
            value={this.props.value}
            onChange={this.timeChanged}
            start={this.props.timeStart}
            end={this.props.timeEnd}
            step={this.props.timeStep}
            locales={this.props.locales} />
        </div>
      );
    }

    return (
      <div>
        <div className={this.props.dateContainerClass}>
          <label className="control-label">
            <span>{this.props.dateLabel}</span>
          </label>
          <DatePicker
            name={this.props.dateName}
            selected={moment(this.props.value)}
            onChange={this.dateChanged}
            minDate={this.props.dateStart ? moment(this.props.dateStart) : null}
            maxDate={this.props.dateEnd ? moment(this.props.dateEnd) : null}
            excludeDates={this.dateExclusions()}
            dateFormat={this.props.dateFormat}
            locale={this.props.locales[0]} 
            className='form-control datepicker__input'
            readOnly={this.props.readOnly} />
        </div>
        {timePickerColumn}
      </div>
    );
  }
});

module.exports = DateTimeGroup;
