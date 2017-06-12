# Changelog

## v4.0.0
- Remove the `insert-css` dependency. The CSS should be linked explicitly.

## v3.2.3
- Fix the callback from the `onChange` prop to be called on changing time

## v3.2.2
- Update react-time-select from 2.2.0 to 2.2.1.

## v3.2.1
- Add `onTimeChange` prop for setting time (hours and minutes);

## v3.2.0
- Add `seperateHourMins` prop for splitting hours and minutes into individual inputs.
- Add `time` object prop for setting minutes and hour values.

## v3.1.1
- Add missing `htmlFor` to label to pair it correctly with the input
- Drop react-datepicker version to fix css bug

## v3.1.0
- Add optional props to pass `id` attributes to the date and time inputs
- Update react-time-select from 2.0.0 to 2.1.0

## v3.0.0

- Updated react-datepicker version from 0.23.1 to 0.39.0

## v2.0.2

- Specified `insert-css` as a dependency.

## v2.0.1

- Transpile fs.readFileSync into inlined string literal.

## 2.0.0

- Updates the component to React 0.14+
- Locale changed from array to string

## 1.0.0

- initial release
