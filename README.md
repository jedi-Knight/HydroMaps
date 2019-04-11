# HydroMaps

## Introduction
This is an interactive web-GIS map of hydropower projects in Nepal.
The map is live at www.kathmandulivinglabs.org/hydropower/ as of April 11, 2019.

## Installation
Clone this repo into the web server path.

## API Endpoints
These are met by static files included in the `data`, `downloads` and  `tiles` directories.
`data`: Contains the Geo-JSON files for the hydropower project points.
`downloads`: Contains the hydropower project details in CSV format (zipped).
`tiles`: Basemap tiles and tiles for the map of transmission lines. This is the directory that makes this repo so large. For convenience, move these to an AWS-S3 bucket.
To use a back-end API, find the above described paths in the `api` field of `js/config.js` and change them to point to the correct API endpoints.

## Code Overview
This app is built using the Cartomancer framework created by GitHub user `jedi-Knight`. It is a jQuery framework for web-GIS maps. The jedi will probably write more about it soon.
- `data.js`: This is where the data model resides. It Model object acts as an in-memory JSON data store which can be queried using the functions provided in this module. It also provides functions for Ajax queries, which are basically wrappers over standard jQuery Ajax and extend its functionality.
- `cartograph.js`: This module provides functions that create and update the DOM components, including the map, using the given parameters.
- `cartomancer.js`: This is the controller that initializes the model and view, listens for user input, calls functions on `data.js` to query the model and calls functions from `cartograph.js` to update the view. 
- `plugins.js` and `guiActions.js`: These provide utility functions to extend the functionality of `cartograph.js` components.