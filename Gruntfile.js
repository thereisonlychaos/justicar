module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concurrent: {
			dev: {
				tasks: [ 'nodemon', 'watch' ],
				options: {
					logConcurrentOutput: true
				}
			}
		},

		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				esversion: 6
			},
			build: [
				'Gruntfile.js',
				'app.js',
				'/irc/**/*.js',
				'/database/**/*.js',
				'/config/*.js',
				'/client/**/*.js',
				'/routes/**/*.js',
				'/bin/**/*.js'
			]
		},

		browserify: {
			client: {
				src: 'client/client.js',
				dest: 'public/app.js'
			}
		},

		sass: {
			dist: {
				files: {
					'public/app.css': 'scss/main.scss'
				}
			}
		},

		watch: {
			css: {
				files: ['scss/**/*.scss'],
				task: ['sass']
			},
			js: {
				files: [
					'Gruntfile.js',
					'app.js',
					'/irc/**/*.js',
					'/database/**/*.js',
					'/config/*.js',
					'/routes/**/*.js',
					'/bin/**/*.js'
				],
				tasks: ['jshint']
			},
			client: {
				files: ['client/**/*.js'],
				tasks: ['jshint', 'browserify']
			}
		},


		nodemon: {
			dev: {
				script: 'app.js'
			}
		}
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', ['jshint', 'browserify', 'sass' ]);
	grunt.registerTask('dev', ['jshint', 'browserify', 'sass', 'concurrent']);
};