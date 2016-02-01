'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
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

var fns = {};

fns.changeDate = function(newDate) {
  myDate = newDate;
  fns.render();
};

fns.render = function() {
  ReactDOM.render(
    <div>
      <h1>Defaults</h1>
      <DateTimeGroup />

      <h1>Date Only</h1>
      <DateTimeGroup includeTime={false} />

      <h1>Options for date</h1>
      <DateTimeGroup
        value={myRestrictedDate}
        dateClassName="myClass"
        dateLabel="Choose a date"
        dateName="TheDate"
        dateStart={minDate}
        dateEnd={maxDate}
        dateExclusions={excludedDates}
        dateFormat="MMMM Do YYYY"
        dateContainerClass="col-xs-12 col-md-8"
        timeContainerClass="col-xs-12 col-md-4" />

      <h1>Options for time (value shared with "Events")</h1>
      <DateTimeGroup
        value={myDate}
        onChange={fns.changeDate}
        timeClassName="myClass"
        timeLabel="Choose a time"
        timeName="TheTime"
        timeStart={330}
        timeEnd={2130}
        timeStep={15}
        dateContainerClass="col-xs-12 col-md-8"
        timeContainerClass="col-xs-12 col-md-4" />

      <h1>Events (value shared with "Options for time")</h1>
      <DateTimeGroup value={myDate} onChange={fns.changeDate} />

      <h1>Localization (Incomplete)</h1>
      <DateTimeGroup onChange={fns.changeDate} locales="en-US" />
    </div>
    ,
    document.getElementById('container')
  );
};

fns.render();
