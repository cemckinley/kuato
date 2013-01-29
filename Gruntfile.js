/*global module:false*/

/*** GRUNT PLUGINS: DEPENDENCIES: ***/
/*
    - grunt-compass (https://npmjs.org/package/grunt-compass)
    - grunt-contrib-concat
    - grunt-contrib-uglify
    - grunt-contrib-jshint
    - grunt-contrib-qunit
    - grunt-contrib-connect
    - grunt-contrib-watch
    - grunt-contrib-copy
*/


module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
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
            tasks: 'jshint copy:dev'
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
    connect: {
        dev: {
            options: {
                port: 8000,
                base: 'temp/'
            }
        }
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
        files: grunt.file.expand([
            'grunt.js',
            'dev/_ui/js/**/*.js',
            'test/**/*.js',
            '!test/qunit.js',
            '!dev/_ui/js/lib/**/*' // leave out 3rd party js in lib folder, since can't guarantee lint quality
        ]),
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
            files: [
                {
                    expand: true,
                    src: [
                        '**',
                        '!**/*.scss' // copy over everything except scss, which will be processed/copied with compass
                    ],
                    dest: 'temp/',
                    cwd: 'dev/'
                }
            ]
        },
        dist: {
            files: [
                {
                    expand: true,
                    src: [
                        '**',
                        '!_ui/css/**', // copy over everything except css and js, which will be processed/copied with compass and concat/min functions
                        '!_ui/js/**'
                    ],
                    dest: 'dist/',
                    cwd: 'dev/'

                }
            ]
        }
    },
    concat: {
        dist: {
            src: ['dev/_ui/js/**/*.js'],
            dest: 'dist/_ui/js/scripts.js'
        }
    },
    uglify: {
        dist: {
            dest: 'dist/_ui/js/scripts.min.js',
            src: ['dist/_ui/js/scripts.js']
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
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-qunit');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-compass');

// custom/ported tasks
grunt.loadTasks('tasks/');

// Default task.
grunt.registerTask('run', ['jshint', 'qunit', 'copy:dev', 'compass:dev', 'connect', 'watch']);
grunt.registerTask('build', ['jshint', 'qunit', 'copy:dist', 'compass:dist', 'concat', 'uglify', 'replacelinks']);

};
