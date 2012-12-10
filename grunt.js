/*global module:false*/

/*** GRUNT 3rd PARTY PLUGINS: DEPENDENCIES: ***/
/*
    - grunt-compass (https://npmjs.org/package/grunt-compass)
    - grunt-contrib-watch (https://github.com/gruntjs/grunt-contrib-watch)
    - grunt-contrib-copy (https://npmjs.org/package/grunt-contrib-copy)
    - grunt-reload (https://npmjs.org/package/grunt-reload)
*/


module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
    meta: {
        version: '0.1.0',
        banner: '/*! PROJECT_NAME - v<%= meta.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* http://PROJECT_WEBSITE/\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
            '  YOUR_NAME; Licensed MIT */'
    },
    qunit: {
        files: ['test/**/*.html']
    },
    watch: {
        compass: {
            files: ['dev/_ui/css/**/*.scss'],
            tasks: ['compass:dev']
        },
        reload: {
            files: [
              'dev/**/*.html',
              'dev/_ui/css/**/*.css',
              'dev/_ui/js/**/*.js',
              'dev/_ui/img/**/*'
            ],
            tasks: 'copy:dev'
        }
    },
    // reload server currently does not work, watch https://github.com/gruntjs/grunt-contrib-livereload for possible future plugin
    reload: {
        port: 6001,
        proxy: {
            host: 'localhost',
            port: 8000 // should match server.port config
        }
    },
    server: {
        port: 8000,
        base: 'temp/'
    },
    lint: {
        files: grunt.file.expandFiles([
            'grunt.js',
            'dev/_ui/js/**/*.js',
            'test/**/*.js'
        ]).filter(function(f){ // filter out 3rd party js in the js/lib folder, since lint quality can't be controlled
            return !/dev\/_ui\/js\/lib\//.test(f);
        })
    },
    jshint: {
        options: {
            curly: true,
            eqeqeq: true,
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            sub: true,
            undef: true,
            boss: true,
            eqnull: true,
            browser: true
        },
        globals: {}
    },
    compass: {
        dev: {
            src: 'dev/_ui/css',
            dest: 'temp/_ui/css',
            linecomments: true,
            debugsass: true,
            relativeassets: true
        },
        dist: {
            src: 'dev/_ui/css',
            dest: 'dist/_ui/css',
            linecomments: false,
            outputstyle: 'compressed',
            debugsass: false,
            relativeassets: true
        }
    },

    // build config
    copy: {
        dev: {
            files: {
                'temp/': grunt.file.expandFiles([
                    'dev/**'
                ]).filter(function(f){// copy over everything except scss, which will be processed/copied with compass
                    return !/.+(\.scss)$/gm.test(f);
                })
            }
        },
        dist: {
            files: {
                // TODO: switch to grunt.file.expand in grunt v0.4.0a, which will support exclusions in minimatch
                'dist/': grunt.file.expandFiles([
                    'dev/**'
                ]).filter(function(f){// copy over everything except css and js, which will be processed/copied with compass and concat/min functions
                    return !/dev\/_ui\/css|dev\/_ui\/js/.test(f);
                })
            }
        }
    },
    concat: {
        dist: {
            src: ['dev/_ui/js/**/*.js'],
            dest: 'dist/_ui/js/scripts.js'
        }
    },
    min: {
        dist: {
            src: ['dist/_ui/js/scripts.js'],
            dest: 'dist/_ui/js/scripts.min.js'
        }
    },
    // replace js and css link build blocks within specified files with their concatenated versions
    replacelinks: {
        files: [
            'dist/*.html'
        ]
    }
});

// grunt 3rd party plugins
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-compass');

// custom/ported tasks
grunt.loadTasks('tasks/');

// Default task.
grunt.registerTask('run', 'lint qunit copy:dev compass:dev server watch');
grunt.registerTask('build', 'lint qunit copy:dist compass:dist concat min replacelinks');

};
