'use strict'

var React = require('react')
var TestUtils = require('react-dom/test-utils')
var TimePicker = require('react-time-select')
var DatePicker = require('react-datepicker')
var moment = require('moment')

var expect = require('chai').expect
var sinon = require('sinon')

var { shallow, configure } = require('enzyme')
var Adapter = require('enzyme-adapter-react-16')
configure({ adapter: new Adapter() })

describe('DateTimeGroup', function () {
  var clock, DateTimeGroup

  before(function () {
    clock = sinon.useFakeTimers(new Date(2015, 5, 6).valueOf())

    // getDefaultProps contains a date and is called when the component
    // is defined - we need to ensure the current date is faked by then.
    DateTimeGroup = require('../src/DateTimeGroup')
  })

  after(function () {
    clock.restore()
  })

  it('is an element', function () {
    expect(TestUtils.isElement(<DateTimeGroup />)).to.equal(true)
  })

  describe('props', function () {
    it('is populated with some defaults', function () {
      var element = <DateTimeGroup />

      expect(element.props).to.deep.equal({
        dateName: 'Date',
        includeTime: true,
        value: new Date(2015, 5, 6, 12, 0, 0),
        locale: 'en-GB',
        seperateHourMins: false,
        time: {
          hours: '12',
          minutes: '00'
        }
      })
    })
  })

  describe('render', function () {
    it('renders the component', function () {
      var dateTimeGroup = shallow(<DateTimeGroup />)
      expect(dateTimeGroup.type()).to.equal('div')
    })

    describe('time-select child component', function () {
      context('when requested', function () {
        var props
        var dateTimeGroup

        before(function () {
          props = {
            timeClassName: 'the-time-class',
            timeLabel: 'the-time-label',
            timeName: 'the-time-label',
            timeStart: 600,
            timeEnd: 1500,
            timeStep: 10,
            locale: 'en-US',
            value: new Date(2015, 8, 9, 15, 30, 0, 0)
          }

          dateTimeGroup = shallow(<DateTimeGroup {...props} />)
        })

        it('renders a time picker', function () {
          expect(dateTimeGroup.find(TimePicker)).to.have.length(1)
        })

        it('passes a className prop through', function () {
          expect(dateTimeGroup.find(TimePicker).props().className).to.equal(props.timeClassName)
        })

        it('passes a label prop through', function () {
          expect(dateTimeGroup.find(TimePicker).props().label).to.equal(props.timeLabel)
        })

        it('passes a name prop through', function () {
          expect(dateTimeGroup.find(TimePicker).props().name).to.equal(props.timeName)
        })

        it('passes a start prop through', function () {
          expect(dateTimeGroup.find(TimePicker).props().start).to.equal(props.timeStart)
        })

        it('passes a end prop through', function () {
          expect(dateTimeGroup.find(TimePicker).props().end).to.equal(props.timeEnd)
        })

        it('passes a step prop through', function () {
          expect(dateTimeGroup.find(TimePicker).props().step).to.equal(props.timeStep)
        })

        it('passes a locales prop through', function () {
          expect(dateTimeGroup.find(TimePicker).props().locale).to.equal(props.locale)
        })

        it('passes a value prop through', function () {
          expect(dateTimeGroup.find(TimePicker).props().value).to.equal(props.value)
        })

        context('with a timeId prop', function () {
          beforeEach(function () {
            dateTimeGroup = shallow(<DateTimeGroup {...props} timeId='timeSelect' />)
          })

          it('passes an id prop', function () {
            expect(dateTimeGroup.find(TimePicker).prop('id')).to.equal('timeSelect')
          })
        })
      })

      context('when not requested', function () {
        it('is not rendered', function () {
          var dateTimeGroup = shallow(<DateTimeGroup includeTime={false} />)
          expect(dateTimeGroup.find(TimePicker)).to.have.length(0)
        })
      })

      context('by default', function () {
        it('is rendered', function () {
          var dateTimeGroup = shallow(<DateTimeGroup />)
          expect(dateTimeGroup.find(TimePicker)).to.have.length(1)
        })
      })
    })

    describe('date-select child component', function () {
      context('with properties', function () {
        var props
        var dateTimeGroup
        before(function () {
          props = {
            date: new Date(2015, 8, 13, 10, 0, 0),
            dateStart: new Date(2015, 8, 9),
            dateEnd: new Date(2015, 8, 20),
            dateExclusions: [
              new Date(2015, 8, 10),
              new Date(2015, 8, 17),
              new Date(2015, 8, 18)
            ]
          }

          dateTimeGroup = shallow(<DateTimeGroup
            dateStart={props.dateStart}
            dateEnd={props.dateEnd}
            dateLabel='the-date-label'
            dateFormat='dd/mm/YYYY'
            dateExclusions={props.dateExclusions}
            locale='en-US'
            value={props.date} />)
        })

        it('is rendered', function () {
          expect(dateTimeGroup.find(DatePicker)).to.have.length(1)
        })

        it('wraps the dateStart in a moment', function () {
          expect(dateTimeGroup.find(DatePicker).props().minDate).to.deep.equal(moment(props.dateStart))
        })

        it('wraps the dateEnd in a moment', function () {
          expect(dateTimeGroup.find(DatePicker).props().maxDate).to.deep.equal(moment(props.dateEnd))
        })

        it('passes the dateFormat through as the field formatter', function () {
          expect(dateTimeGroup.find(DatePicker).props().dateFormat).to.equal('dd/mm/YYYY')
        })

        it('passes the first locale through (only one is expected)', function () {
          expect(dateTimeGroup.find(DatePicker).props().locale).to.equal('en-US')
        })

        it('wraps the value in a moment', function () {
          expect(dateTimeGroup.find(DatePicker).props().selected).to.deep.equal(moment(props.date))
        })

        it('passes the value through', function () {
          expect(dateTimeGroup.find(DatePicker).props().selected.toDate()).to.deep.equal(props.date)
        })

        it('wraps all the excluded dates in moments', function () {
          expect(moment.isMoment(dateTimeGroup.find(DatePicker).props().excludeDates[0])).to.equal(true)
          expect(moment.isMoment(dateTimeGroup.find(DatePicker).props().excludeDates[1])).to.equal(true)
          expect(moment.isMoment(dateTimeGroup.find(DatePicker).props().excludeDates[2])).to.equal(true)
        })

        it('passes all the excluded dates through', function () {
          expect(dateTimeGroup.find(DatePicker).props().excludeDates[0].toDate()).to.deep.equal(props.dateExclusions[0])
          expect(dateTimeGroup.find(DatePicker).props().excludeDates[1].toDate()).to.deep.equal(props.dateExclusions[1])
          expect(dateTimeGroup.find(DatePicker).props().excludeDates[2].toDate()).to.deep.equal(props.dateExclusions[2])
        })

        it('renders the date label into a span', function () {
          expect(dateTimeGroup.find('span').children().text()).to.equal('the-date-label')
        })

        context('with a dateId prop', function () {
          beforeEach(function () {
            dateTimeGroup = shallow(<DateTimeGroup {...props} dateId='dateSelect' dateLabel='the-date-label' />)
          })

          it('passes an id prop to the datepicker', function () {
            expect(dateTimeGroup.find(DatePicker).prop('id')).to.equal('dateSelect')
          })

          it('renders a paired label', function () {
            expect(dateTimeGroup.find('label').prop('htmlFor')).to.equal('dateSelect')
          })
        })
      })
    })
  })

  describe('events', function () {
    var props

    beforeEach(function () {
      props = {
        time: {
          hours: '11',
          minutes: '30'
        }
      }
    })

    it('will emit a date up if the date is changed', function () {
      var date = new Date(2015, 5, 5)
      var handler = sinon.stub()

      var dateTimeGroup = shallow(<DateTimeGroup onChange={handler} {...props} value={date} />)
      var input = dateTimeGroup.find('.datepicker__input')

      input.simulate('change', moment('2015-06-12'))

      sinon.assert.called(handler)
      sinon.assert.calledWith(handler, new Date(2015, 5, 12, 11, 30, 0, 0))
    })

    it('will emit current time up with date when changed', function () {
      props.time.hours = '15'
      props.time.minutes = '30'
      var date = new Date(2015, 5, 5)
      var handler = sinon.stub()

      var dateTimeGroup = shallow(<DateTimeGroup onChange={handler} {...props} value={date} />)
      var input = dateTimeGroup.find('.datepicker__input')

      input.simulate('change', moment('2015-06-12'))

      sinon.assert.called(handler)
      sinon.assert.calledWith(handler, new Date(2015, 5, 12, 15, 30, 0, 0))
    })

    it('will emit time up when time changed', function () {
      props.seperateHourMins = true
      props.includeTime = true
      props.value = new Date(2015, 5, 5)

      const expectedCurrentTime = new Date(2015, 5, 5, 11, 15, 0, 0)

      var timeHandler = sinon.stub()
      var dateHandler = sinon.stub()

      var doc = TestUtils.renderIntoDocument(<DateTimeGroup onTimeChange={timeHandler} onChange={dateHandler} {...props} />)
      var timeNode = TestUtils.scryRenderedDOMComponentsWithTag(doc, 'select')[1]

      TestUtils.Simulate.change(timeNode, {
        target: {
          value: '15'
        }
      })

      sinon.assert.calledWith(timeHandler, expectedCurrentTime)
      sinon.assert.calledWith(dateHandler, expectedCurrentTime)
    })

    it('will not throw errors if no onClick is provided (for date)', function () {
      var dateTimeGroup = shallow(<DateTimeGroup />)
      var input = dateTimeGroup.find('.datepicker__input')

      expect(function () {
        input.simulate('change', moment('2015-06-12'))
      }).to.not.throw(Error)
    })

    it('will not throw errors if no onClick is provided (for time)', function () {
      var doc = TestUtils.renderIntoDocument(<DateTimeGroup />)
      var timeNode = TestUtils.findRenderedDOMComponentWithTag(doc, 'select')

      expect(function () {
        TestUtils.Simulate.change(timeNode, {
          target: {
            value: '12:30'
          }
        })
      }).to.not.throw(Error)
    })
  })
})
