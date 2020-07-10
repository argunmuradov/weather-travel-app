# Introduction

This web-app is a Node-Express JavaScript app that helps users plan their trips by giving important weather and date data.

## Dependencies
Project uses different technologies such as Express for server-side, and webpack for build. SASS is used to write easier stylesheets and Jest is used for the testing of the functions.
## Important Files
1. /src/client/js/app.js
   This file forms the basic functionality of the app. It contains different methods including the GET and POST routes for data exchange with the server. It also has the main function that is added as the event listener to the button in the DOM.
## Build
To build the code in Development mode using webpack dev server:
```bash
npm run build-dev
```

To build the code in Production mode
```bash
npm run build-prod
```
## Run the app
To run the produciton mode app run
```bash
npm run start
```
in the Terminal

## Usage

To use the app, insert the City name as a travel destination, and Arrival and Departure dates in the textboxes. Press the 'add trip' button.


