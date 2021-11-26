# Interview Scheduler

The Scheduler application was a [Lighthouse Labs](https://www.lighthouselabs.ca) project that was completed during the [Web Development Flex Program](https://www.lighthouselabs.ca/en/web-development-flex-program).  It is a SPA that was built using the React Javascript library.
The application allows the user to display the appointments for Monday to Friday that are stored in a supplied API using axios.  The user can then create new appointments by entering in the students name and selecting an interviewer.  The user can then edit or delete the appointments as well.

This version was edited and completed by [Tyler Shelton](https://github.com/TylerJEShelton).

## Screenshots

!["Scheduler Main Page"](https://github.com/TylerJEShelton/scheduler/blob/master/images/scheduler-main.png?raw=true)
!["Scheduler Create Appointment"](https://github.com/TylerJEShelton/scheduler/blob/master/images/scheduler-add.png?raw=true)
!["Scheduler Delete Appointment"](https://github.com/TylerJEShelton/scheduler/blob/master/images/scheduler-delete.png?raw=true)
!["Scheduler Deleting Appointment Status"](https://github.com/TylerJEShelton/scheduler/blob/master/images/scheduler-status.png?raw=true)

## Setup

Install dependencies with `npm install`.
Fork and clone the [Scheduler API](https://github.com/lighthouse-labs/scheduler-api) project. 

## Dependencies

- axios ^0.24.0
- classnames ^2.2.6
- normalize.css ^8.0.1
- react ^16.9.0
- react-dom ^16.9.0
- react-hooks-testing-library ^0.6.0
- react-scripts 3.0.0

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
