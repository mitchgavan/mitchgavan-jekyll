'use strict';

module.exports = function (grunt) {

    // Show elapsed time after tasks run to visualize performance
    require('time-grunt')(grunt);
    // Load all Grunt tasks that are listed in package.json automagically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // shell commands for use in Grunt tasks
        shell: {
            jekyllBuild: {
                command: 'jekyll build'
            },
            jekyllServe: {
                command: 'jekyll serve'
            }
        },

        // watch for files to change and run tasks when they do
        watch: {
            sass: {
                files: ['_scss/**/*.{scss,sass}'],
                tasks: ['sass', 'postcss']
            }
        },

        // sass (libsass) config
        sass: {
            options: {
                sourceMap: true,
                relativeAssets: false,
                outputStyle: 'expanded',
                sassDir: '_sxss',
                cssDir: '_site/css'
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '_scss/',
                    src: ['**/*.{scss,sass}'],
                    dest: '_site/css',
                    ext: '.css'
                }]
            }
        },

        // postcss (for autoprefixing)
        postcss: {
          options: {
            map: true,
            processors: [
              require('autoprefixer-core')({browsers: ['last 2 versions', 'ie 9']}),
              require('csswring')
            ]
          },
          dist: {
            src: '_site/css/*.css'
          }
        },

        // run tasks in parallel
        concurrent: {
            serve: [
                'sass',
                'postcss',
                'watch',
                'shell:jekyllServe'
            ],
            options: {
                logConcurrentOutput: true
            }
        },

    });

    // Register the grunt serve task
    grunt.registerTask('serve', [
        'concurrent:serve'
    ]);

    // Register the grunt build task
    grunt.registerTask('build', [
        'shell:jekyllBuild',
        'sass',
        'postcss'
    ]);

    // Register build as the default task fallback
    grunt.registerTask('default', 'build');

};