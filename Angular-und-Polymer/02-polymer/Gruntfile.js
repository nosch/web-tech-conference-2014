/**
 * polymer-scaffold
 * Grunt task runner configuration.
 */
module.exports = function (grunt) {
    'use strict';

    // load all required Grunt plugins listed in package.json
    require('load-grunt-tasks')(grunt);

    // display the elapsed execution time of all tasks
    require('time-grunt')(grunt);

    // Task configuration
    grunt.initConfig({
        // Project paths
        scaffold: {
            buildDir: 'build/',
            bowerDir: 'src/bower_components/',
            sourceDir: 'src/'
        },

        mkdir: {
            build: {
                options: {
                    create: ['build']
                }
            }
        },

        copy: {
            default: {
                cwd: '<%= scaffold.sourceDir %>',
                src: ['**/*'],
                dest: '<%= scaffold.buildDir %>',
                expand: true
            }
        },

        // Vulcanize configuration
        vulcanize: {
            default: {
                options: {},
                files: {
                    '<%= scaffold.buildDir %>/index.html': '<%= scaffold.buildDir %>/index.html'
                }
            }
        },

        // Connect server configuration
        connect: {
            default: {
                options: {
                    hostname: 'localhost',
                    port: 3333,
                    base: '<%= scaffold.buildDir %>',
                    open: true
                }
            }
        },

        watch: {
            default: {
                files: [
                    '<%= scaffold.sourceDir %>index.html',
                    '<%= scaffold.sourceDir %>elements/**/*',
                    'Gruntfile.js'
                ],
                tasks: [
                    'build'
                ]
            }
        }
    });

    // Task registration
    grunt.registerTask('default', ['build']);

    grunt.registerTask('build', [
        'mkdir:build',
        'copy:default',
        'vulcanize:default'
    ]);

    grunt.registerTask('server', [
        'build',
        'connect:default',
        'watch:default'
    ]);
};
