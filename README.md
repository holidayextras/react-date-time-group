# react-date-time-group

[React](https://facebook.github.io/react/) Component for a date picker & time picker, emitting Date instances if either part is changed. Requires react v0.14+.

```
var DateTimeGroup = require('react-date-time-group');
React.render(<DateTimeGroup />, document.getElementById('container'));
```

## Options

- __onChange__ - Event handler for when a time is selected. It will be passed a date instance set to that time, with years/months/days to match the date you provided as __value__, or today's date if it was not present.
- __value__ - JS Date instance representing the datetime to be displayed.
- __includeTime__ - Whether to ask for a date and time, or just a date. Defaults to true.
- __locale__ - Locale ReactIntl should attempt to use for formatting. Default is 'en-GB'.

### Date options

- __dateLabel__ - Label for date field. Default "Date".
- __dateStart__ - Date instance representing the earliest day selectable
- __dateName__ - Name for date field. Default "Date"
- __dateEnd__ - Date instance representing the latest day selectable
- __dateExclusions__ - Array of date instances to be "greyed out"
- __dateFormat__ - Format string used in the calendar header and as the value of the input element

### Time options

- __timeClassName__ - `class` attribute to be applied to time picker element. Default "input-sm".
- __timeLabel__ - Label for time field. Default "Time".
- __timeName__ - Name for time field. Default "Time".
- __timeStart__ - Time to start from when generating range, for example `start={1230}`. Default is {30} (00:30).
- __timeEnd__ - Time to stop generating range. Default is {2359}. Will not be listed as an option if your "step" value overruns it.
- __timeStep__ - Number of minutes between each option. Default is {30}.

## Developing

Clone the repo and `npm install`.

`npm start` will create and watchify an example which you can open in your browser, at `doc/example.html`

`npm test` for the unit tests.

`npm run lint` checks the code against our [guidelines](https://github.com/holidayextras/culture/blob/master/.eslintrc)

`npm run coverage` gets coverage with istanbul, outputing to the `coverage` directory, and exiting nonzero if any metric is below 100%.