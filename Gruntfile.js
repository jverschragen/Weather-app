module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            sass: {
                files: '**/*.sass', // ** any directory; * any file
                tasks: ['css'],
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
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('css', ['sass', 'cssmin']);
    // Load up tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
};