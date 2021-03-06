/*global module:false*/


module.exports = function(grunt) {

var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

// Project configuration.
grunt.initConfig({
    qunit: {
        files: ['test/**/*.html']
    },
    regarde: {
        css: {
            files: [
                'dev/_ui/css/**/*.scss',
                'dev/_ui/css/**/*.css'
            ],
            tasks: ['compass:dev', 'copy:devcss', 'livereload']
        },
        js: {
            files: [
                'dev/_ui/js/**/*.js'
            ],
            tasks: ['copy:devjs', 'livereload']
        },
        other: {
            files: [
                'dev/**/*.html',
                'dev/_ui/img/**/*'
            ],
            tasks: ['copy:devall', 'livereload']
        }
    },
    connect: {
        dev: {
            options: {
                port: 8001,
                hostname: null, // setting hostname to null allows requests at port 8001 locally for any host name (i.e. localhost, network IP or machine name)
                base: 'temp',
                middleware: function(connect, options) {
                    return [lrSnippet, folderMount(connect, 'temp')];
                }
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
            'dev/_ui/js/**/*.js',
            'test/**/*.js',
            '!test/qunit.js',
            '!dev/_ui/js/lib/**/*' // leave out 3rd party js in lib folder, since can't guarantee lint quality
        ]),
        globals: {}
    },
    compass: {
        dev: {
            options: {
                cssDir: 'temp/_ui/css',
                sassDir: 'dev/_ui/css',
                environment: 'development'
            }
        },
        dist: {
            options: {
                cssDir: 'dist/_ui/css',
                sassDir: 'dev/_ui/css',
                environment: 'production'
            }
        }
    },

    // build config
    clean: {
        dev: ["temp"],
        dist: ["dist"]
    },
    copy: {
        devcss: {
            files: [
                {
                    expand: true,
                    src: [
                        '_ui/css/**/*.css'
                    ],
                    dest: 'temp/',
                    cwd: 'dev/'
                }
            ]
        },
        devjs: {
            files: [
                {
                    expand: true,
                    src: [
                        '_ui/js/**/*.js'
                    ],
                    dest: 'temp/',
                    cwd: 'dev/'
                }
            ]
        },
        devall: {
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
grunt.loadNpmTasks('grunt-contrib-livereload');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-qunit');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-regarde');
grunt.loadNpmTasks('grunt-contrib-compass');
grunt.loadNpmTasks('grunt-contrib-clean');

// custom/ported tasks
grunt.loadTasks('tasks/');

// Default task.
grunt.registerTask('run', ['jshint', 'clean:dev', 'qunit', 'copy:devall', 'compass:dev', 'livereload-start', 'connect:dev', 'regarde']);
grunt.registerTask('build', ['jshint', 'clean:dist', 'qunit', 'copy:dist', 'compass:dist', 'concat', 'uglify', 'replacelinks']);
grunt.registerTask('test', ['jshint', 'qunit']);

};
