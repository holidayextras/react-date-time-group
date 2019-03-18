import React from 'react'
import TimePicker from 'react-time-select'
import moment from 'moment'
import PropTypes from 'prop-types'
import DatePicker, { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
registerLocale('en-GB', enGB);

class DateTimeGroup extends React.Component {
  constructor (props) {
    super(props)
    this.timeChanged = this.timeChanged.bind(this)
    this.dateChanged = this.dateChanged.bind(this)
    this.dateExclusions = this.dateExclusions.bind(this)
  }
  timeChanged (time) {
    this.props.time.hours = time.hours
    this.props.time.minutes = time.minutes

    const newDate = this.props.value
    newDate.setHours(time.hours)
    newDate.setMinutes(time.minutes)

    if (this.props.onTimeChange) {
      this.props.onTimeChange(newDate)
    }

    if (this.props.onChange) {
      this.props.onChange(newDate)
    }
  }

  dateChanged (newMoment) {
    if (this.props.onChange) {
      var newDate = newMoment.toDate()
      newDate.setHours(this.props.time.hours, this.props.time.minutes, 0, 0)

      this.props.onChange(newDate)
    }
  }

  dateExclusions () {
    if (!this.props.dateExclusions) {
      return null
    }
    return this.props.dateExclusions.map(function (date) {
      return moment(date)
    })
  }

  render () {
    var timePickerColumn = <span />
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
      )
    }

    return (
      <div>
        <div className={this.props.dateContainerClass}>
          {this.props.dateLabel
            ? <label
              className='control-label'
              htmlFor={this.props.dateId}
            >
              <span>{this.props.dateLabel}</span>
            </label>
            : ''}
          <DatePicker
            fixedHeight
            showMonthDropdown={this.props.showMonthDropdown}
            showYearDropdown={this.props.showYearDropdown}
            name={this.props.dateName}
            selected={moment(this.props.value)}
            onChange={this.dateChanged}
            minDate={this.props.dateStart ? moment(this.props.dateStart) : null}
            maxDate={this.props.dateEnd ? moment(this.props.dateEnd) : null}
            excludeDates={this.dateExclusions()}
            dateFormat={this.props.dateFormat}
            locale={this.props.locale}
            className='form-control datepicker__input'
            readOnly={this.props.readOnly}
            id={this.props.dateId}
          />
        </div>
        {timePickerColumn}
      </div>
    )
  }
}

DateTimeGroup.propTypes = {
  includeTime: PropTypes.bool,
  timeClassName: PropTypes.string,
  timeLabel: PropTypes.string,
  timeName: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  onTimeChange: PropTypes.func,
  timeStart: PropTypes.number,
  time: PropTypes.shape({
    hours: PropTypes.string,
    minutes: PropTypes.string
  }),
  timeEnd: PropTypes.number,
  timeStep: PropTypes.number,
  dateName: PropTypes.string,
  dateLabel: PropTypes.string,
  dateStart: PropTypes.instanceOf(Date),
  dateEnd: PropTypes.instanceOf(Date),
  dateFormat: PropTypes.string,
  dateExclusions: PropTypes.array,
  locale: PropTypes.string,
  timeContainerClass: PropTypes.string,
  dateContainerClass: PropTypes.string,
  readOnly: PropTypes.bool,
  dateId: PropTypes.string,
  timeId: PropTypes.string,
  seperateHourMins: PropTypes.bool,
  showMonthDropdown: PropTypes.bool,
  showYearDropdown: PropTypes.bool
}

var defaultDate = new Date()
defaultDate.setHours(12, 0, 0, 0)

DateTimeGroup.defaultProps = {
  includeTime: true,
  dateName: 'Date',
  value: defaultDate,
  locale: 'en-GB',
  seperateHourMins: false,
  time: {
    hours: '12',
    minutes: '00'
  }
}

module.exports = DateTimeGroup
