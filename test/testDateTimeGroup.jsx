'use strict';

var React = require('react/addons');
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
    DateTimeGroup = require('../src/DateTimeGroup');
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
        dateName: 'Date',
        includeTime: true,
        value: new Date(2015, 5, 6, 12, 0, 0),
        locales: [ 'en-GB' ]
      });
    });
  });

  describe('render', function() {
    it('renders the component', function() {
      var renderOutput = shallowRender(<DateTimeGroup />);
      expect(renderOutput.type).to.equal('div');
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

          var div = renderOutput.props.children[1];
          timePicker = div.props.children;
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
          var div = renderOutput.props.children[1];
          var timePicker = div.props.children;
          expect(timePicker).to.equal(undefined);
        });
      });

      context('by default', function() {
        it('is rendered', function() {
          var renderOutput = shallowRender(<DateTimeGroup />);
          var div = renderOutput.props.children[1];
          var timePicker = div.props.children;
          expect(timePicker.type).to.equal(TimePicker);
        });
      });
    });

    describe('date-select child component', function() {

      context('with properties', function() {
        var date, datePicker, startDate, endDate, dateLabel, excludedDates;

        before(function() {
          date = new Date(2015, 8, 13, 10, 0, 0);
          startDate = new Date(2015, 8, 9);
          endDate = new Date(2015, 8, 20);
          excludedDates = [
            new Date(2015, 8, 10),
            new Date(2015, 8, 17),
            new Date(2015, 8, 18)
          ];

          var renderOutput = shallowRender(<DateTimeGroup
            dateStart={startDate}
            dateEnd={endDate}
            dateLabel="the-date-label"
            dateFormat="dd/mm/YYYY"
            dateExclusions={excludedDates}
            locales={['en-US']}
            value={date} />);

          var div = renderOutput.props.children[0].props.children;
          dateLabel = div[0].props.children.props.children;
          datePicker = div[1];
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

        it('passes the first locale through (only one is expected)', function() {
          expect(datePicker.props.locale).to.equal('en-US');
        });

        it('wraps the value in a moment', function() {
          expect(moment.isMoment(datePicker.props.selected)).to.equal(true);
        });

        it('passes the value through', function() {
          expect(datePicker.props.selected.toDate()).to.deep.equal(date);
        });

        it('wraps all the excluded dates in moments', function() {
          expect(moment.isMoment(datePicker.props.excludeDates[0])).to.equal(true);
          expect(moment.isMoment(datePicker.props.excludeDates[1])).to.equal(true);
          expect(moment.isMoment(datePicker.props.excludeDates[2])).to.equal(true);
        });

        it('passes all the excluded dates through', function() {
          expect(datePicker.props.excludeDates[0].toDate()).to.deep.equal(excludedDates[0]);
          expect(datePicker.props.excludeDates[1].toDate()).to.deep.equal(excludedDates[1]);
          expect(datePicker.props.excludeDates[2].toDate()).to.deep.equal(excludedDates[2]);
        });

        it('renders the date label into a span', function() {
          expect(dateLabel).to.equal('the-date-label');
        });
      });
    });
  });

  describe('events', function() {
    it('will emit a date up if the time is changed', function() {
      var handler = sinon.stub();
      var doc = TestUtils.renderIntoDocument(<DateTimeGroup onChange={handler} />);
      var node = TestUtils.findRenderedDOMComponentWithTag(doc, 'select').getDOMNode();

      React.addons.TestUtils.Simulate.change(node, {
        target: {
          value: '16:30'
        }
      });

      sinon.assert.calledWith(handler, new Date(2015, 5, 6, 16, 30, 0, 0));
    });

    it('will emit a date up if the date is changed', function() {
      var date = new Date(2015, 5, 5, 11, 30, 0, 0);
      var handler = sinon.stub();
      var group = <DateTimeGroup onChange={handler} value={date} />;

      var doc = TestUtils.renderIntoDocument(group);
      var node = TestUtils.findRenderedDOMComponentWithClass(doc, 'datepicker__input').getDOMNode();

      React.addons.TestUtils.Simulate.change(node, {
        target: {
          value: '2015-06-12'
        }
      });

      sinon.assert.called(handler);
      sinon.assert.calledWith(handler, new Date(2015, 5, 12, 11, 30, 0, 0));
    });

    it('will not throw errors if no handler is provided', function() {
      var group = <DateTimeGroup />;

      var doc = TestUtils.renderIntoDocument(group);
      var dateNode = TestUtils.findRenderedDOMComponentWithClass(doc, 'datepicker__input').getDOMNode();
      var timeNode = TestUtils.findRenderedDOMComponentWithTag(doc, 'select').getDOMNode();

      expect(function() {
        React.addons.TestUtils.Simulate.change(dateNode, {
          target: {
            value: '2015-06-12'
          }
        });
      }).to.not.throw(Error);

      expect(function() {
        React.addons.TestUtils.Simulate.change(timeNode, {
          target: {
            value: '12:30'
          }
        });
      }).to.not.throw(Error);
    });
  });
});
