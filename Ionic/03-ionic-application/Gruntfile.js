/**
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
        pkg: grunt.file.readJSON('package.json'),

        meta: {
            banner:
                '/**\n' +
                ' * <%= pkg.name %> v<%= pkg.version %>\n' +
                ' * <%= pkg.homepage %>\n' +
                ' *\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * Released under the <%= pkg.licenses[0].type %> license\n' +
                ' * <%= pkg.licenses[0].url %>\n' +
                ' *\n' +
                ' * Date: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' */\n'
        },

        // Project paths
        scaffold: {
            sourceDir: 'src/',
            bowerDir: 'src/bower_components/',
            buildRoot: 'www/',
            tmpDir: 'www/.tmp/',
            assetDir: 'www/.tmp/asset/',
            concatDir: 'www/.tmp/concat/',
            htmlDir: 'www/.tmp/html/',
            distDir: 'www/',
            resDir: 'src/res/'
        },

        clean: {
            build: ['<%= scaffold.buildRoot %>'],
            tmp: ['<%= scaffold.tmpDir %>'],
            fonts: ['<%= scaffold.sourceDir %>asset/fonts/']
        },

        useminPrepare: {
            html: '<%= scaffold.sourceDir %>index.html',
            options: {
                staging: '<%= scaffold.tmpDir %>',
                dest: '<%= scaffold.distDir %>'
            }
        },

        usemin: {
            html: '<%= scaffold.htmlDir %>index.html'
        },

        ngmin: {
            app: {
                src: ['<%= scaffold.concatDir %>js/app.js'],
                dest: '<%= scaffold.concatDir %>js/app.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= meta.banner %>',
                mangle: true,
                compress: true
            }
        },

        cssmin: {
            options: {
                banner: '<%= meta.banner %>',
                keepSpecialComments: 0
            }
        },

        html2js: {
            app: {
                options: {
                    module: 'template.app',
                    useStrict: true,
                    quoteChar: '\'',
                    indentString: '    ',
                    htmlmin: {
                        collapseBooleanAttributes: false,
                        collapseWhitespace: true,
                        removeAttributeQuotes: false,
                        removeComments: true,
                        removeEmptyAttributes: false,
                        removeRedundantAttributes: false,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                },
                src: ['<%= scaffold.sourceDir %>app/**/*.tpl.html'],
                dest: '<%= scaffold.sourceDir %>app/app-template.js'
            }
        },

        copy: {
            fonts: {
                // Ionic fonts
                cwd: '<%= scaffold.bowerDir %>ionic/',
                src : ['fonts/*.*'],
                dest: '<%= scaffold.sourceDir %>asset/',
                expand: true
            },
            tmp: {
                files: [{
                    // HTML index
                    cwd: '<%= scaffold.sourceDir %>',
                    src: ['index.html'],
                    dest: '<%= scaffold.htmlDir %>',
                    expand: true
                }, {
                    // Assets (css, fonts, img)
                    cwd: '<%= scaffold.sourceDir %>',
                    src : ['asset/**/*.*'],
                    dest: '<%= scaffold.tmpDir %>',
                    expand: true
                }]
            },

            dist: {
                files: [{
                    // HTML index
                    cwd: '<%= scaffold.htmlDir %>',
                    src : ['index.html'],
                    dest: '<%= scaffold.distDir %>',
                    expand: true
                }, {
                    // css, fonts, images
                    cwd: '<%= scaffold.assetDir %>',
                    src : ['**'],
                    dest: '<%= scaffold.distDir %>',
                    expand: true
                }]
            },

            unmin: {
                files: [{
                    cwd: '<%= scaffold.concatDir %>',
                    src : ['**'],
                    dest: '<%= scaffold.distDir %>',
                    expand: true
                }]
            }
        },

        connect: {
            options: {
                hostname: 'localhost',
                port: 8080
            },
            standard: {
                options: {
                    base: '<%= scaffold.distDir %>',
                    open: true,
                    middleware: function (connect, options) {
                        return [
                            require('connect-livereload')(),
                            connect.static(options.base)
                        ];
                    }
                }
            }
        },

        watch: {
            standard: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= scaffold.sourceDir %>index.html',
                    '<%= scaffold.sourceDir %>app/**/*.tpl.html',
                    '<%= scaffold.sourceDir %>app/**/*.js',
                    '<%= scaffold.sourceDir %>asset/**/*.*',
                    '<%= scaffold.sourceDir %>css/*.css',
                    'Gruntfile.js'
                ],
                tasks: [
                    'build'
                ]
            }
        }
    });

    // Task registration
    grunt.registerTask('default', ['server']);

    grunt.registerTask('prepare', [
        'clean:build',
        'copy:fonts',
        'html2js',
        'useminPrepare',
        'copy:tmp',
        'concat'
    ]);

    grunt.registerTask('build', [
        'prepare',
        'usemin',
        'copy:dist',
        'copy:unmin',
        'clean:fonts'
    ]);

    grunt.registerTask('server', [
        'build',
        'connect',
        'watch:standard'
    ]);

    grunt.registerTask('release', [
        'prepare',
        'ngmin',
        'uglify',
        'cssmin',
        'usemin',
        'copy:dist',
        'clean:fonts',
        'clean:tmp'
    ]);
};
