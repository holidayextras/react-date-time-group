'use strict';
/* eslint-disable no-alert */

var React = require('react');
var DateTimeGroup = require('../src/DateTimeGroup.jsx');
var myDate = new Date('2015-05-05T09:00');

var myRestrictedDate = new Date('2015-05-10T09:00');
var minDate = new Date('2015-05-03T00:00');
var maxDate = new Date('2015-05-16T00:00');
var excludedDates = [
  new Date('2015-05-05T00:00'),
  new Date('2015-05-06T00:00'),
  new Date('2015-05-12T00:00'),
  new Date('2015-05-15T00:00')
];

var changeDate = function(newDate) {
  myDate = newDate;
  render();
};

var render = function() {
  React.render(
    <div>
      <h1>Defaults</h1>
      <DateTimeGroup />

      <h1>Date Only</h1>
      <DateTimeGroup includeTime={false} />

      <h1>Options for time (value shared with "Events")</h1>
      <DateTimeGroup 
        value={myDate}
        onChange={changeDate}
        timeClassName="myClass"
        timeLabel="Choose a time"
        timeName="TheTime"
        timeStart={330}
        timeEnd={2130}
        timeStep={15} />

      <h1>Options for date</h1>
      <DateTimeGroup
        value={myRestrictedDate}
        dateClassName="myClass"
        dateLabel="Choose a date"
        dateName="TheDate"
        dateStart={minDate}
        dateEnd={maxDate}
        dateExclusions={excludedDates}
        dateFormat="MMMM Do YYYY" />

      <h1>Events (value shared with "Options for time")</h1>
      <DateTimeGroup value={myDate} onChange={changeDate} />

      <h1>Localization</h1>
      <DateTimeGroup value={myDate} onChange={changeDate} locales={['en-US']} />
    </div>
    ,
    document.getElementById('container')
  );
};

render();