module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    assemble: {
      options: {partials: 'build/css/*.css'},
      css: {
        src: ['src/email.html'],
        dest: 'build/email.html',
        flatten: true
      }
    },

    clean: [ 
      'build', 
      'dist'
    ],

    copy: {
      build_images: {
        src: ['**'],
        dest: 'build/images',
        cwd: 'src/images',
        expand: true
      },
      build_css: {
        src: ['*.css'],
        dest: 'build/css',
        cwd: 'src/css',
        expand: true
      },
      dist_html: {
        src: ['**/*.html'],
        dest: 'dist/',
        cwd: 'build/',
        expand: true
      },
      dist_images: {
        src: ['**'],
        dest: 'dist/images',
        cwd: 'build/images',
        expand: true
      }
    },

    less: {
      build: {
        files: {
          'build/css/custom.css': 'src/css/less/custom.less'
        }
      }
    },

    uncss: {
      dist: {
        src: ['build/email.html'],
        dest: 'build/css/tidy.css',
        options: {
          report: 'min' // optional: include to report savings
        }
      }
    },

    processhtml: {
      dist: {
        files: {
          'dist/email.html': ['build/email.html']
        }
      }
    },

    premailer: {
      main: {
        options: {
          verbose: true
        },
        files: {
          'dist/email-inline.html': ['build/email.html']
        }
      }
    },

    watch: {
      html: {
        files: [
        'src/**/*',
        ],
        tasks: [
        'build'
        ],
        options: {
          livereload: true,
        },
      },
    },
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-processhtml');
  // grunt.loadNpmTasks('grunt-mailgun');
  grunt.loadNpmTasks('grunt-premailer');

  grunt.registerTask('build', [
    'clean',
    'less',
    'copy:build_images',
    'copy:build_css',
    'assemble'
    ]);
  grunt.registerTask('compile', [
    'clean',
    'less',
    'copy:build_images',
    'copy:build_css',
    'assemble',
    'uncss',
    'processhtml',
    'premailer'
    ]);
  grunt.registerTask('default', ['build', 'watch']);
};