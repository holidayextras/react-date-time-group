'use strict';

var fs = require('fs');
var path = require('path');
var insertcss = require('insert-css');
insertcss(fs.readFileSync(path.join(__dirname, '/../node_modules/react-datepicker/dist/react-datepicker.css'), 'utf8'));

var React = require('react');
var TimePicker = require('react-time-select');
var DatePicker = require('react-datepicker');
var moment = require('moment');

var DateTimeGroup = React.createClass({
  propTypes: {
    includeTime: React.PropTypes.bool,
    timeClassName: React.PropTypes.string,
    timeLabel: React.PropTypes.string,
    timeName: React.PropTypes.string,
    value: React.PropTypes.instanceOf(Date),
    onChange: React.PropTypes.func,
    onTimeChange: React.PropTypes.func,
    timeStart: React.PropTypes.number,
    time: React.PropTypes.shape({
      hours: React.PropTypes.string,
      minutes: React.PropTypes.string
    }),
    timeEnd: React.PropTypes.number,
    timeStep: React.PropTypes.number,
    dateName: React.PropTypes.string,
    dateLabel: React.PropTypes.string,
    dateStart: React.PropTypes.instanceOf(Date),
    dateEnd: React.PropTypes.instanceOf(Date),
    dateFormat: React.PropTypes.string,
    dateExclusions: React.PropTypes.array,
    locale: React.PropTypes.string,
    timeContainerClass: React.PropTypes.string,
    dateContainerClass: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    dateId: React.PropTypes.string,
    timeId: React.PropTypes.string,
    seperateHourMins: React.PropTypes.bool
  },

  getDefaultProps: function() {
    var defaultDate = new Date();
    defaultDate.setHours(12, 0, 0, 0);

    return {
      includeTime: true,
      dateName: 'Date',
      value: defaultDate,
      locale: 'en-GB',
      seperateHourMins: false,
      time: {
        hours: '12',
        minutes: '00'
      }
    };
  },

  timeChanged: function(time) {
    var newDate = this.props.value;
    newDate.setHours(time.hours);
    this.props.time.hours = time.hours;

    newDate.setMinutes(time.minutes);
    this.props.time.minutes = time.minutes;

    this.props.onTimeChange(newDate);
  },

  dateChanged: function(newMoment) {
    if (this.props.onChange) {
      var newDate = newMoment.toDate();
      newDate.setHours(this.props.time.hours, this.props.time.minutes, 0, 0);

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
            time={this.props.time}
            value={this.props.value}
            onChange={this.timeChanged}
            start={this.props.timeStart}
            end={this.props.timeEnd}
            step={this.props.timeStep}
            locale={this.props.locale}
            id={this.props.timeId}
            seperateHourMins={this.props.seperateHourMins}
          />
        </div>
      );
    }

    return (
      <div>
        <div className={this.props.dateContainerClass}>
          {this.props.dateLabel ?
            <label
              className="control-label"
              htmlFor={this.props.dateId}
            >
              <span>{this.props.dateLabel}</span>
            </label>
            : ''}
          <DatePicker
            name={this.props.dateName}
            selected={moment(this.props.value)}
            onChange={this.dateChanged}
            minDate={this.props.dateStart ? moment(this.props.dateStart) : null}
            maxDate={this.props.dateEnd ? moment(this.props.dateEnd) : null}
            excludeDates={this.dateExclusions()}
            dateFormat={this.props.dateFormat}
            locales={this.props.locale}
            className="form-control datepicker__input"
            readOnly={this.props.readOnly}
            id={this.props.dateId}
          />
        </div>
        {timePickerColumn}
      </div>
    );
  }
});

module.exports = DateTimeGroup;
