module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> ' + 'v:' + '<%= pkg.version %> ' + 'Date: ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
        watch: {
            sass: {
                files: '**/*.sass', // ** any directory; * any file
                tasks: ['css'],
                options: {
                    livereload: 35729
                }
            },
            uglify: {
                files: 'scripts/main.js',
                tasks: ['uglify'],
                options: {
                    livereload: true
                }
            },
            all: {
                files: ['**/*.html'],
                options: {
                    livereload: true
                }
            }
        },

        uglify: {
            build: {
                files: {
                    'scripts/main.min.js': ['scripts/main.js']
                }
            }
        },

        cssmin: {
            build: {
                src: 'styles/main.css',
                dest: 'styles/main.min.css'
            }
        },

        sass: {
            dev: {    // indicates that it will be used only during development
                files: {
                    // destination // source file
                    'styles/main.css': 'styles/main.sass'
                }
            }
        }
    });

    // Default task
    grunt.registerTask('css', ['sass', 'cssmin']);
    grunt.registerTask('js', ['uglify']);
    grunt.registerTask('default', ['css', 'js', 'watch']);
    // Load up tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
};