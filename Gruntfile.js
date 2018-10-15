module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> ' + 'v:' + '<%= pkg.version %> ' + 'Date: ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
        watch: {
            sass: {
                files: 'app/**/*.sass', // ** any directory; * any file
                tasks: ['css'],
                options: {
                    livereload: 35729
                }
            },
            uglify: {
                files: 'app/scripts/main.js',
                tasks: ['uglify'],
                options: {
                    livereload: true
                }
            },
            all: {
                files: ['app/*.html'],
                options: {
                    livereload: true
                }
            }
        },

        uglify: {
            build: {
                files: {
                    'dist/javascript/main.min.js': 'app/**/main.js'
                }
            }
        },

        cssmin: {
            build: {
                src: 'app/styles/main.css',
                dest: 'dist/css/main.min.css'

            }
        },

        sass: {
            dev: {    // indicates that it will be used only during development
                files: {
                    // destination // source file
                    'app/styles/main.css': 'app/styles/main.sass'
                }
            }
        }
    });

    // Load up tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task
    grunt.registerTask('css', ['sass', 'cssmin']);
    grunt.registerTask('js', ['uglify']);
    grunt.registerTask('default', ['css', 'js', 'watch']);
};