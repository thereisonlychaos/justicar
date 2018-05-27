module.exports = function (grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            build: ['Gruntfile.js'],
            server: {
                options: {
                    node: true,
                    esversion: 6
                },
                files: {
                    src: ['server/**/*.js']
                }
            },
            client: {
                options: {
                    browserify: true,
                    esversion: 6,
                    globals: {
                        "angular": true
                    }
                },
                files: {
                    src: ['client/**/*.js']
                }
            }
        },

        supervisor: {
            target: {
                script: 'server/server.js',
                options: {
                    ignore: [ "client", "public" ]
                }
            },
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            dev: ['supervisor', 'watch'],
            embed: ['supervisor', 'watch:server']
        },

        browserify: {
            dev: {
                options: {
                    transform: [['babelify', {presets: ['env']}]],
                    browserifyOptions: {
                        debug: true
                    },
                    sourceMaps: true
                },
                src: 'client/client.js',
                dest: 'public/app.js'
            },
            lib: {
                options: {
                    transform: [['babelify', {presets: ['env']}]],
                    browserifyOptions: {
                        debug: true
                    },
                    sourceMaps: true
                },
                src: 'client/lib.js',
                dest: 'public/lib.js'
            },
            live: {
                options: {
                    browserifyOptions: {
                        debug: false
                    },
                    transform: [
                        ['babelify', {presets: ['env']}],
                        ['uglifyify', { global: true }]
                    ],
                    sourceMaps: false
                },
                src: 'client/client.js',
                dest: 'public/app.js'
            },
            livelib: {
                options: {
                    browserifyOptions: {
                        debug: false
                    },
                    transform: [
                        ['babelify', {presets: ['env']}],
                        ['uglifyify', { global: true }]
                    ],
                    sourceMaps: false
                },
                src: 'client/lib.js',
                dest: 'public/lib.js'
            },
        },

        less: {
            dist: {
                files: {
                    'public/app.css': 'less/main.less'
                },
                options: {
                    sourceMap: true,
                    compress: true
                }
            }
        },

        watch: {
            less: {
                files: ['less/**/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            },
            // css: {
            //     files: ['less/**/*.less'],
            //     task: ['less']
            // },
            build: {
                files: ['Gruntfile.js'],
                tasks: ['jshint:build']
            },
            server: {
                files: ['server/**/*.js', 'server/*.js'],
                tasks: ['jshint:server']
            },
            client: {
                files: ['client/**/*.js', 'client/*.js', '!client/lib.js'],
                tasks: ['browserify:dev']
            },
            lib: {
                files: ['client/lib.js'],
                tasks: ['browserify:lib']
            }
        }
    });


    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    require('load-grunt-tasks')(grunt);

    // Default task(s).
    grunt.registerTask('default', [
        'jshint',
        'browserify:live',
        'browserify:livelib',
        'less'
    ]);
    grunt.registerTask('dev', [
        'jshint',
        'browserify:lib',
        'browserify:dev',
        'less',
        'concurrent:dev'
    ]);

    grunt.registerTask('inspect', [
        'jshint'
    ]);

    grunt.registerTask('build', [
        'jshint',
        'browserify:dev',
        'less',
        'concurrent:dev'
    ]);

};
