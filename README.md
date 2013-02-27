# KUATO

Simple front-end file scaffold/starter site for a static web site, with grunt tasks for processing/building. The goal is to keep it lightweight for typical static site usage, but because everything is built on grunt.js, it's highly extensible/configurable.


## Features

- jsHint code linting on build
- support for qunit testing
- SASS for CSS - automatically processes your styles when saved
- Static server for previewing the site
- Build command to nicely package files for deployment, combining and minifying javascript files

## Installation

Requires node, npm, compass, and grunt-cli to be installed first. Kuato is built based on the latest grunt 0.4.x release. You should have installed grunt-cli already, and a local copy of grunt will be added to a project you create using kuato. See https://github.com/gruntjs/grunt/wiki/Getting-started for more info on getting started with grunt.


Once node, npm, compass, and grunt-cli are installed, run the following command in your terminal:  
`npm install -g kuato`  

## Command line usage

`cd` to the directory where you want to create a new project folder.
- `kuato`: Create a new grunt-based project scaffold

`cd` into the new project directory (where the grunt file is) and:
- `grunt run`: Lints and tests code, copies and processes code to a 'temp' folder, and starts a local static web server with live reloading on port 8001. All web files will be watched for changes, copied to 'temp' on change, and any pages connected to the server will reload automatically.
- `grunt build`: Lints and tests code, processes css, concatenates and minifies js, copies files to a 'dist' directory ready for deployment
- `grunt test`: Lints and tests code.

### Grunt Task Dependencies
(Auto-installed per project by 'kuato' command)

- grunt-compass (https://npmjs.org/package/grunt-compass)
- grunt-contrib-concat
- grunt-contrib-uglify
- grunt-contrib-jshint
- grunt-contrib-qunit
- grunt-contrib-connect
- grunt-contrib-livereload
- grunt-contrib-regarde
- grunt-contrib-copy
