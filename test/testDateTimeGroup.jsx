'use strict';

var React = require('react/addons');
var ReactBootstrap = require('react-bootstrap');
var TestUtils = React.addons.TestUtils;

var TimePicker = require('react-time-select');
var DatePicker = require('react-datepicker');
var moment = require('moment');

var expect = require('chai').expect;
var sinon = require('sinon');

var shallowRender = require('react-shallow-render');

describe('DateTimeGroup', function() {
  var clock, DateTimeGroup;

  before(function() {
    clock = sinon.useFakeTimers(new Date(2015, 5, 6).valueOf());

    // getDefaultProps contains a date and is called when the component
    // is defined - we need to ensure the current date is faked by then.
    DateTimeGroup = require('../');
  });

  after(function() {
    clock.restore();
  });

  it('is an element', function() {
    expect(TestUtils.isElement(<DateTimeGroup />)).to.equal(true);
  });

  describe('props', function() {
    it('is populated with some defaults', function() {
      var element = <DateTimeGroup />;

      expect(element.props).to.deep.equal({
        dateLabel: 'Date',
        includeTime: true,
        value: new Date(2015, 5, 6, 12, 0, 0),
        locales: [ 'en-GB' ]
      });
    });
  });

  describe('render', function() {
    it('renders a row and some columns', function() {
      var renderOutput = shallowRender(<DateTimeGroup />);
    });

    describe('time-select child component', function() {
      context('when requested', function() {
        var timePicker, date;

        before(function() {
          date = new Date(2015, 8, 9, 15, 30, 0, 0);

          var renderOutput = shallowRender(<DateTimeGroup
            timeClassName="the-time-class"
            timeLabel="the-time-label"
            timeName="the-time-name"
            timeStart={600}
            timeEnd={1500}
            timeStep={10}
            locales={['en-US']}
            value={date} />);

          var row = renderOutput.props.children;
          var columns = row.props.children;
          timePicker = columns[1].props.children;
        });

        it('renders a time picker', function() {
          expect(timePicker.type).to.equal(TimePicker);
        });

        it('passes a className prop through', function() {
          expect(timePicker.props.className).to.equal('the-time-class');
        });

        it('passes a label prop through', function() {
          expect(timePicker.props.label).to.equal('the-time-label');
        });

        it('passes a name prop through', function() {
          expect(timePicker.props.name).to.equal('the-time-name');
        });

        it('passes a start prop through', function() {
          expect(timePicker.props.start).to.equal(600);
        });

        it('passes a end prop through', function() {
          expect(timePicker.props.end).to.equal(1500);
        });

        it('passes a step prop through', function() {
          expect(timePicker.props.step).to.equal(10);
        });

        it('passes a locales prop through', function() {
          expect(timePicker.props.locales).to.deep.equal(['en-US']);
        });

        it('passes a value prop through', function() {
          expect(timePicker.props.value).to.equal(date);
        });
      });

      context('when not requested', function() {
        it('is not rendered', function() {
          var renderOutput = shallowRender(<DateTimeGroup includeTime={false} />);

          var row = renderOutput.props.children;
          var columns = row.props.children;

          expect(columns[1].props.children).to.equal(undefined);
        });
      });

      context('by default', function() {
        it('is rendered', function() {
          var renderOutput = shallowRender(<DateTimeGroup />);

          var row = renderOutput.props.children;
          var columns = row.props.children;
          var timePicker = columns[1].props.children;

          expect(timePicker.type).to.equal(TimePicker);
        });
      });
    });

    describe('date-select child component', function() {
      context('with no properties', function() {
        it('is rendered', function() {
          var renderOutput = shallowRender(<DateTimeGroup />);
          var row = renderOutput.props.children;
          var columns = row.props.children;

          expect(columns[0].props.children[1].type).to.equal(DatePicker);
        });
      });

      context('with properties', function() {
        var date, datePicker, startDate, endDate, dateLabel;

        before(function() {
          date = new Date(2015, 8, 13, 10, 0, 0);
          startDate = new Date(2015, 8, 9);
          endDate = new Date(2015, 8, 20);

          var renderOutput = shallowRender(<DateTimeGroup
            dateStart={startDate}
            dateEnd={endDate}
            dateLabel="the-date-label"
            dateFormat="dd/mm/YYYY"
            locales={['en-US']}
            value={date} />);

          var row = renderOutput.props.children;
          var columns = row.props.children;
          dateLabel = columns[0].props.children[0].props.children.props.children;
          datePicker = columns[0].props.children[1];
        });

        it('is rendered', function() {
          expect(datePicker.type).to.equal(DatePicker);
        });

        it('wraps the dateStart in a moment', function() {
          expect(moment.isMoment(datePicker.props.minDate)).to.equal(true);
        });

        it('passes the dateStart through', function() {
          expect(datePicker.props.minDate.toDate()).to.deep.equal(startDate);
        });

        it('wraps the dateEnd in a moment', function() {
          expect(moment.isMoment(datePicker.props.maxDate)).to.equal(true);
        });

        it('passes the dateEnd through', function() {
          expect(datePicker.props.maxDate.toDate()).to.deep.equal(endDate);
        });

        it('passes the dateFormat through as the field formatter', function() {
          expect(datePicker.props.dateFormat).to.equal('dd/mm/YYYY');
        });

        it('passes the dateFormat through as the heading formatter', function() {
          expect(datePicker.props.dateFormatCalendar).to.equal('dd/mm/YYYY');
        });

        it('passes the first locale through (only one is expected)', function() {
          expect(datePicker.props.locale).to.equal('en-US');
        });

        it('wraps the value in a moment', function() {
          expect(moment.isMoment(datePicker.props.selected)).to.equal(true);
        });

        it('passes the value through', function() {
          expect(datePicker.props.selected.toDate()).to.deep.equal(date);
        });

        it('renders the date label into a span', function() {
          expect(dateLabel).to.equal('the-date-label');
        });
      });
    });
  });

  describe('events', function() {
    it('will emit a date up if the time is changed', function() {

    });

    it('will emit a date up if the date is changed', function() {

    });
  });
});
