Grunt Build Scaffold
=======================

Simple front-end file scaffold/starter site for a static web site, with grunt tasks for processing/building. The goal is to keep it lightweight for typical static site usage, but because everything is built on grunt.js, it's highly extensible/configurable.


## Features

- jsHint code linting on build
- support for qunit testing
- SASS for CSS - automatically processes your styles when saved
- Static server for previewing the site
- Build command to nicely package files for deployment, combining and minifying javascript files


## Command line usage

- `grunt run`:
 Lints and tests code, copies and processes code to a 'temp' folder, and starts a local static web server on port 8000. All web files will be watched for changes. Coming soon: a live reload feature.
- `grunt build`:
 Lints and tests code, processes css, concatenates and minifies js, copies files to a 'dist' directory ready for deployment

Requires npm/grunt to be installed, along with the below node package dependencies. See https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md for grunt.js setup instructions.


### Dependencies
(installed node packages in project directory)

- grunt-compass (https://npmjs.org/package/grunt-compass)
- grunt-contrib-watch (https://github.com/gruntjs/grunt-contrib-watch)
- grunt-contrib-copy (https://npmjs.org/package/grunt-contrib-copy)

TBD: creating either a node package, grunt init template, or script file to neatly package the scaffold for easy install of pieces and dependencies.


#### TODO:
- Convert project to node package or grunt init template and auto install dependencies, for easy use