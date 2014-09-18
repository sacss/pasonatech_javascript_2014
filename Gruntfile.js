module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // jekyll (for HTML)
    jekyll: {
      server : {
        options: {
          src : '_source',
          dest: './demo',
          server : true,
          server_port : 4000,
          auto : true
        }
      },
      dev: {
        options: {
          src: '_source',
          dest: './demo'
        }
      }
    },

    // compass (for CSS)
    compass: {
      dev: {
        options: {
          httpPath: '.',
          sassDir: '_source/_sass',
          cssDir: 'demo/css',
          images: 'demo/images',
          outputStyle: 'compact',
          relativeAssets: true,
          noLineComments: true
        }
      }
    },

    // watch
    watch: {
      jekyll: {
        files: ['_source/*.html','_source/**/*.html', '_source/js/**'],
        tasks: ['jekyll:dev', 'compass:dev']
      },
      compass: {
        files: ['_source/_sass/*.scss'],
        tasks: ['compass:dev']
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'demo/**/*.css',
            'demo/**/*.js',
            'demo/**/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: 'demo/'
          }
        }
      }
    }
  });

  grunt.registerTask('default', ['browserSync', 'watch']);
  grunt.registerTask('build', ['jekyll:dev', 'compass:dev']);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-browser-sync');
};
